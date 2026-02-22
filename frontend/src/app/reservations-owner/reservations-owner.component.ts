import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReservationService } from '../services/reservation.service';
import Reservation from '../models/reservation';
import { DatePipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations-owner',
  standalone: true,
  imports: [FullCalendarModule, DatePipe, FormsModule],
  templateUrl: './reservations-owner.component.html',
  styleUrl: './reservations-owner.component.css'
})
export class ReservationsOwnerComponent implements OnInit{
  ngOnInit(): void {
    let u = localStorage.getItem('user')
    if(u) this.owner = JSON.parse(u).username
    this.reservationService.getOwnerReservations(this.owner).subscribe((data) => {
      if(data){
          this.reservations = data.sort((a, b) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime()
        })
        let today = new Date()
        today.setHours(0,0,0,0)
        
        data.forEach(reservation => {
          let from = new Date(reservation.dateFrom)
          from.setHours(0, 0, 0,0)
          if(from.getTime() <= today.getTime() && reservation.approved != 'approved'){
            this.reservationService.rejectRes(reservation._id, this.reason).subscribe((data)=>{
                    alert("Automatski odbijena rezervacija")
                    window.location.reload()
            })
          }
        })

        this.updateCalendar()
      }
     
    })
    
  }

  private reservationService = inject(ReservationService)
  private dialog = inject(MatDialog)
  reservations: Reservation[] = []
  owner = ""
  declineId: string|null = null
  reason = ""
  error = ""

  calendar: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: this.addEvents(), 
    eventClick: (info) => { 
      const props = info.event.extendedProps
      if(!props['approved']){
          const dialog = this.dialog.open(ReservationDialogComponent, {
            height: '200px',
            width: '600px',
            data: {
              guest: props['guest']
            }
          })
          dialog.afterClosed().subscribe(result => {
            if (result === 'approve') {
              this.approve(props['idRes']);
            } else if (result === 'reject') {
              let reason = prompt('Unesite razlog odbijanja rezervacije: ')
              if(reason){
                  this.reason = reason
                  this.rejectReservation(props['idRes']);
              }else alert('Morate uneti razlog za odbijanje!')
            }

          })
      }
    }
  }
  addEvents() {
      return this.reservations.map(reservation => {
        return {
          title:reservation.houseRef?.name ,
          start: new Date(reservation.dateFrom),
          end: new Date(reservation.dateTo),
          color: reservation.approved == "approved" ? '#32b141' : '#ffd700' ,
          extendedProps: { 
            approved: reservation.approved,
            idRes: reservation._id,
            guest: reservation.guest
          }
        }
      })
    } 

   updateCalendar() {
    this.calendar.events = this.addEvents()
  }

  toggleDecline(idRes: string){
    if(this.declineId == idRes) this.declineId = null
    else this.declineId = idRes
  }

  approve(idRes: string){
    this.reservationService.approveRes(idRes).subscribe((data) => {
      alert(data.message)
      window.location.reload()
    })
  }

  rejectReservation(idRes: string){
    if(!this.reason) {
      this.error = "Morate da napisete razlog odbijanja"
      return
    }
    this.reservationService.rejectRes(idRes, this.reason).subscribe((data) => {
      alert(data.message)
      window.location.reload()
    })
    
    
  }

}
