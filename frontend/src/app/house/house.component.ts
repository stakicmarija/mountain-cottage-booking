import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '../services/house.service';
import House from '../models/house';
import * as L from 'leaflet';
import Reservation from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent implements OnInit{
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.houseService.getHouse(id).subscribe((data) => {
        if(data){
            this.house = data
            this.initMap()
            this.reservationService.getHouseReservations(this.house._id).subscribe((data) => {
              this.reservations = data
            })
        }
      })
    }
  }
  private route = inject(ActivatedRoute)
  private houseService = inject(HouseService)
  private reservationService = inject(ReservationService)
  private router = inject(Router)

  house : House = new House()
  reservations : Reservation[] = []
  full = false
  curr = 0
  pinIcon = L.icon({
    iconUrl: 'gps.png',
    iconSize: [44, 44],
    iconAnchor:   [22, 44], //spic pina
    popupAnchor:  [0, -40] //popup
  })

  initMap(){
    const map = L.map('map').setView([this.house.lat, this.house.long], 15)

     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([this.house.lat, this.house.long], {icon: this.pinIcon}).addTo(map)
    .bindPopup(this.house.name).openPopup()
  }

  reserve(){
    this.router.navigate(['/reserve1/'+this.house._id])
  }

  fullScreen(index: number){
    this.curr = index
    this.full = true
  }

  prev(){
    this.curr = (this.curr == -1) ? (this.house.gallery.length-1) : this.curr-1
  }

  next(){
    this.curr = (this.curr == this.house.gallery.length-1) ? -1 : this.curr+1
  }

  close(){
    this.full = false
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.full) {
      switch(event.key) {
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
        case 'Escape':
          this.close();
          break;
      }
    }
  }

}
