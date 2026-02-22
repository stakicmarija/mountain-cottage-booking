import { Component, inject, OnInit } from '@angular/core';
import Reservation from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { raceWith } from 'rxjs';

@Component({
  selector: 'app-reservations-tourist',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './reservations-tourist.component.html',
  styleUrl: './reservations-tourist.component.css'
})
export class ReservationsTouristComponent implements OnInit{
  ngOnInit(): void {
    let u = localStorage.getItem('user')
    if (u) this.username = JSON.parse(u).username

    this.reservationService.getGuestsRes(this.username).subscribe((data) => {
      if (data) {
        const today = new Date()

        this.activeRes = data.filter(res => {
          const dateTo = new Date(res.dateTo)
          return dateTo >= today
        })

        this.pastRes = data.filter(res => {
          const dateTo = new Date(res.dateTo)
          return dateTo < today
        }).sort((a, b) => {
          return new Date(b.dateTo).getTime() - new Date(a.dateTo).getTime()
        })

        this.pastRes.forEach(res => {
          this.rating[res._id] = 0
        })
      }
    })
  }

  private reservationService = inject(ReservationService)

  username = ""
  activeRes: Reservation[] = []
  pastRes: Reservation[] = [] 
  rating : { [id: string]: number } = {}
  selectedRatingId: string | null = null
  comment = ""
  error = ""

  setRating(value: number, id:string){
    this.rating[id] = value
  }

  toggleShowRating(id: string){
    if(this.selectedRatingId == id) this.selectedRatingId = null
    else this.selectedRatingId = id
  }

  canCancel(dateFrom: Date): boolean{
    const today = new Date()
    const date = new Date(dateFrom)
    const msInDay = 1000 * 60 * 60 *24
    const diff = (date.getTime() - today.getTime()) / msInDay

    return diff > 1
  }

  cancel(id:string){
    if(confirm("Da li sigurno želite da otkažete rezervaciju?")){
      this.reservationService.deleteRes(id).subscribe((data) => {
        alert(data.message)
        window.location.reload()
      })
    }
  }

  rate(id:string, houseId:string){
    if(!this.comment || !this.rating[id]) {
      this.error = "Potrebno je i da ocenite i da napisete komentar"
      return
    } 
    this.reservationService.addRate(id, houseId, this.comment,this.rating[id]).subscribe((data) => {
      if(data) {
        alert(data.message)
        window.location.reload()
      }
    })
  }

}
