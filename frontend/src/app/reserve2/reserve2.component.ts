import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HouseService } from '../services/house.service';
import House from '../models/house';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve2',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './reserve2.component.html',
  styleUrl: './reserve2.component.css'
})
export class Reserve2Component implements OnInit{
  ngOnInit(): void {
    let u = localStorage.getItem('user')
    if(u){
      this.card = JSON.parse(u).card
      this.guest = JSON.parse(u).username
    }
    let res = localStorage.getItem('step1')
    if(res){
      let data = JSON.parse(res)
      this.houseId = data.houseId
      this.dateFrom = new Date(data.dateFrom)
      this.dateTo = new Date(data.dateTo)
      this.hoursFrom = data.hoursFrom
      this.hoursTo = data.hoursTo
      this.minutesFrom = data.minutesFrom
      this.minutesTo = data.minutesTo
      this.adults = data.adults
      this.children = data.children
      this.houseService.getHouse(this.houseId).subscribe((data) => {
        if(data) this.house = data
        this.numberOfNights()
        if(this.summerSeason()) this.price = this.nights * this.house.summerPrice
        else this.price = this.nights * this.house.winterPrice
      })
      this.getCardType(this.card)
    }
  }

  private houseService = inject(HouseService)
  private reservationService = inject(ReservationService)
  private router = inject(Router)

  card = ""
  guest = ""
  houseId = ""
  dateFrom : Date = new Date()
  dateTo : Date = new Date()
  hoursFrom = 0
  hoursTo = 0
  minutesFrom = 0
  minutesTo = 0
  adults = 0
  children = 0
  description = ""
  house: House = new House()
  nights = 0
  price = 0
  cardType = ""
  error = ""

  numberOfNights(){
    const differenceInMs = Math.abs(this.dateTo.getTime() - this.dateFrom.getTime())
    const msInDay = 1000 * 60 * 60 * 24
    this.nights = Math.ceil(differenceInMs/msInDay)
  }

  summerSeason(): boolean{
    let month = this.dateFrom.getMonth()
    if(month == 4 || month == 5 || month == 6 || month == 7) return true
    return false
  }

  getCardType(card: string){
  this.cardType = ""
    switch (card.length){
      case 15:
        if((/^300|^301|^302|^303|^36|^38/).test(card)) this.cardType = 'diners-club'
        break
      case 16:
        if((/^51|^52|^53|^54|^55/).test(card)) this.cardType = 'master'
        else if((/^4539|^4556|^4916|^4532|^4929|^4485|^4716/).test(card)) this.cardType = 'visa'
        break
      default:
        this.cardType = ""
    }

  } 

  submit(){
    if (!this.cardType) {
      this.error = "Nevalidan broj kartice"
      return
    }
    const startDateTime = new Date(this.dateFrom);
    startDateTime.setHours(this.hoursFrom);
    startDateTime.setMinutes(this.minutesFrom);
    startDateTime.setSeconds(0);

    const endDateTime = new Date(this.dateTo);
    endDateTime.setHours(this.hoursTo);
    endDateTime.setMinutes(this.minutesTo);
    endDateTime.setSeconds(0);

    const res = {
      'guest': this.guest,
      'houseId': this.houseId,
      'dateFrom': startDateTime,
      'dateTo': endDateTime,
      'adults': this.adults,
      'children': this.children,
      'description':this.description
    }

    this.reservationService.createReservation(res).subscribe((data) => {
      alert(data.message)
      localStorage.removeItem('step1')
      this.router.navigate(['/reservations-tourist'])
    })
  }

}
