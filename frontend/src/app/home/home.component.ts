import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../models/user';
import { TouristService } from '../services/tourist.service';
import { OwnerService } from '../services/owner.service';
import { Router } from '@angular/router';
import { HouseService } from '../services/house.service';
import House from '../models/house';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if(user){
      this.user = JSON.parse(user)
      this.type = this.user.type
    }
    this.touristService.countTourists().subscribe((data) => {
      if(data) this.tourists = data
    })
    this.ownerService.countOwners().subscribe((data) => {
      if(data) this.owners = data
    })
    this.houseService.countHouses().subscribe((data) => {
      if(data) this.houses = data
    })
    this.reservationService.countDay().subscribe((data) => {
      if(data) this.resDay = data
    })
    this.reservationService.countWeek().subscribe((data) => {
      if(data) this.resWeek = data
    })
    this.reservationService.countMonth().subscribe((data) => {
      if(data) this.resMonth = data
    })
    this.houseService.getHouses().subscribe((data) => {
      if(data){
        data.forEach((house) => {
          if(!house.blocked) this.allHouses.push(house)
        })
        this.filteredHouses = this.allHouses
      }
    })
  }

  private touristService = inject(TouristService)
  private ownerService = inject(OwnerService)
  private houseService = inject(HouseService)
  private reservationService = inject(ReservationService)
  private router = inject(Router)

  houses = 0
  owners = 0
  tourists = 0
  resDay = 0
  resWeek = 0
  resMonth = 0
  average = 3.5
  user : User = new User()
  allHouses : House[] = []
  filteredHouses : House[] = []
  type = ""
  searchPlace = ""
  searchName = ""
  sort = ""

  goToHouse(id: string){
    if(this.type == "tourist"){
      this.router.navigate(['/house/'+id]) 
    }
  }

  sortHouses(){

    if(this.sort.includes('Place')){
      this.filteredHouses.sort((a, b) => 
        this.sort.includes('increase') ?
        a.place.localeCompare(b.place) :
        b.place.localeCompare(a.place)
      )
    }

    if(this.sort.includes('Name')){
      this.filteredHouses.sort((a, b) => 
       this.sort.includes('increase') ?
        a.name.localeCompare(b.name) :
        b.name.localeCompare(a.name)
      )
    }

  }

  onSearch(){
    this.filteredHouses = this.allHouses

    if(this.searchPlace){
      this.filteredHouses = this.filteredHouses.filter(house => 
        house.place.toLowerCase().includes(this.searchPlace.toLowerCase())
      )
    }

    if(this.searchName){
      this.filteredHouses = this.filteredHouses.filter(house => 
        house.name.toLowerCase().includes(this.searchName.toLowerCase())
      )
    }
  }

  starParts(rating:number){
    let stars : number[] = []
    for(let i = 0; i < 5; i++){
      let star = rating - i
      if(star > 0.85 ) stars.push(1)
      else if (0.1 <= star && star <= 0.35) stars.push(0.25)
      else if (0.35 <= star && star <= 0.60) stars.push(0.5)
      else if (0.60 <= star && star <= 0.85) stars.push(0.75)
      else stars.push(0)
    }
    return stars
  }
}
