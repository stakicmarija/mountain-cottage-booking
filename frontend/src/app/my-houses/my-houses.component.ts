import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import House from '../models/house';
import { HouseService } from '../services/house.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-my-houses',
  standalone: true,
  imports: [AddComponent],
  templateUrl: './my-houses.component.html',
  styleUrl: './my-houses.component.css'
})
export class MyHousesComponent implements OnInit{
  ngOnInit(): void {
    let u = this.route.snapshot.paramMap.get('username')
    if(u) this.username = u
    this.houseService.getOwnersHouses(this.username).subscribe((data) => {
      if(data) this.houses = data
    })
  }

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private houseService = inject(HouseService)

  houses : House[] = []
  username = ""

  edit(id : string){
    this.router.navigate(['/edit/'+id])
  }

  delete(id : string){
    this.houseService.deleteHouse(id).subscribe((data) => {
      alert(data.message)
      window.location.reload()
    })
  }

}
