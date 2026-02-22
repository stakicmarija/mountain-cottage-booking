import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import User from '../models/user';
import { TouristService } from '../services/tourist.service';
import { OwnerService } from '../services/owner.service';
import { UserService } from '../services/user.service';
import House from '../models/house';
import { HouseService } from '../services/house.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
    ngOnInit(): void {
      this.touristService.getApproved().subscribe((data) => {
        if(data) this.tourists = data
      })
      this.ownerService.getApproved().subscribe((data) => {
        if(data) this.owners = data
      })
      this.userService.notApproved().subscribe((data) => {
        if(data) this.notApproved = data
      })
      this.houseService.getHouses().subscribe((data) => {
        if(data){
          this.houses = data
          this.houses.forEach((house) => {
            this.reservationService.lastThreeBad(house._id).subscribe((bad) => {
              bad.success ? this.housesMap.set(house._id, true) : this.housesMap.set(house._id, false) 
            })
          })
        } 
      })
    }

    badReviews = true

    private touristService = inject(TouristService)
    private ownerService = inject(OwnerService)
    private userService = inject(UserService)
    private houseService = inject(HouseService)
    private reservationService = inject(ReservationService)
    private router = inject(Router)

    tourists: User[] = []
    owners: User[] = []
    notApproved: User[] = []
    houses: House[] = []
    housesMap: Map<string, boolean> = new Map()

    edit(username:string){
      this.router.navigate(['/admin-edit/' + username])
    }

    approve(username:string){
      this.userService.approve(username).subscribe((data) =>{
        if(data){
          alert(data.message)
          window.location.reload()
        }
    })
    }

    decline(username:string){
      this.userService.decline(username).subscribe((data) =>{
        if(confirm("Da li sigurno želite da odbijete?")){
          alert(data.message)
          window.location.reload()
        }
    })
    }

    block(id: string){
      this.houseService.blockHouse(id).subscribe((data) => {
        alert(data.message)
        window.location.reload()
      })
    }

}
