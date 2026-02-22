import { Component, inject, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-reserve1',
  standalone: true,
  imports: [ MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './reserve1.component.html',
  styleUrl: './reserve1.component.css'
})
export class Reserve1Component implements OnInit{
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if(id) this.houseId = id
    this.dateTo.setDate(this.dateFrom.getDate() + 1)
  }

  adults = 1
  children = 0
  dateFrom: Date = new Date()
  dateTo: Date = new Date()
  minDate: Date = new Date()
  timeFrom: string = "14:00"
  timeTo: string = "08:00"
  houseId = ""
  error = ""

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private reservationService = inject(ReservationService)

  onDateFromChange(): void {
    this.updateDateTo();
  }

  updateDateTo(): void {
    const nextDay = new Date(this.dateFrom);
    nextDay.setDate(this.dateFrom.getDate() + 1);

    if (this.dateTo <= this.dateFrom) {
      this.dateTo = nextDay;
    }
  }

  getMinDateTo(): Date {
    const minDateTo = new Date(this.dateFrom);
    minDateTo.setDate(this.dateFrom.getDate() + 1);
    return minDateTo;
  }

  adultsPlus(){
    this.adults++
  }

  childrenPlus(){
    this.children++
  }

  adultsMinus(){
    if(this.adults > 1 ) this.adults--
  }

  childrenMinus(){
    if(this.children > 0 ) this.children--
  }

  next(){
    this.reservationService.checkAvailable(this.dateFrom, this.dateTo, this.houseId).subscribe((data) => {
      if(data) {
        alert(data.message)
        return
      }
       if(!this.dateFrom || !this.dateTo) {
        this.error = "Niste izabrali datume"
        return
      }
      const [hoursFrom, minutesFrom] = this.timeFrom.split(':').map(Number)
      const [hoursTo, minutesTo] = this.timeTo.split(':').map(Number)

      if((hoursFrom == 20 && minutesFrom > 0) || hoursFrom > 20 ){
        this.error = "Prekasno za dolazak"
        return
      }
      if(hoursFrom < 14 ){
        this.error = "Prerano za dolazak"
        return
      }
      if((hoursTo == 10 && minutesTo > 0) || hoursTo > 10 ){
        this.error = "Prekasno za odlazak"
        return
      }
      if( hoursTo < 6 ){
        this.error = "Prerano za odlazak"
        return
      }

      const res = {
        'houseId': this.houseId,
        'dateFrom': this.dateFrom,
        'dateTo': this.dateTo,
        'hoursFrom': hoursFrom,
        'hoursTo': hoursTo,
        'minutesFrom':minutesFrom,
        'minutesTo':minutesTo,
        'adults': this.adults,
        'children': this.children
      }

      localStorage.setItem('step1', JSON.stringify(res))
      this.router.navigate(['/reserve2'])
      
    })
   
  }


}
