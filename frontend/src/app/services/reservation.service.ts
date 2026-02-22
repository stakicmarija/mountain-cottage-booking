import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/message';
import Reservation from '../models/reservation';
import Statistics from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:4000/reservation'

  createReservation(data: Object){
    return this.http.post<Message>(`${this.baseUrl}/createReservation`, data)
  }

  checkAvailable(dateFrom: Date, dateTo: Date, houseId: string){
    dateFrom.setHours(23, 59, 59, 999)
    const data = {
      'dateFrom':dateFrom,
      'dateTo':dateTo,
      'houseId':houseId
    }
    return this.http.post<Message>(`${this.baseUrl}/checkAvailable`, data)
  }

  getGuestsRes(guest: string){
    const data = {'guest': guest}
    return this.http.post<Reservation[]>(`${this.baseUrl}/getGuestsRes`, data)
  }

  deleteRes(id: string){
    const data = {'id': id}
    return this.http.post<Message>(`${this.baseUrl}/deleteRes`, data)    
  }

  addRate(id:string,houseId : string ,comment: string, stars: number){
    const data = {
      'id':id,
      'houseId':houseId,
      'comment': comment,
      'stars':stars
    }
    return this.http.post<Message>(`${this.baseUrl}/addRate`, data)      
  }

  getHouseReservations(id:string){
    const data = {'id': id}
    return this.http.post<Reservation[]>(`${this.baseUrl}/getHouseReservations`, data)       
  }
  countDay(){
    return this.http.get<number>(`${this.baseUrl}/countDay`)
  }

   countWeek(){
    return this.http.get<number>(`${this.baseUrl}/countWeek`)
  }

  countMonth(){
    return this.http.get<number>(`${this.baseUrl}/countMonth`)
  }

  getOwnerReservations(ownerUsername:string){
    const data = {'username': ownerUsername}
    return this.http.post<Reservation[]>(`${this.baseUrl}/getOwnerReservations`, data)       
  }

  approveRes(idRes: string){
    const data = {'id': idRes}
    return this.http.post<Message>(`${this.baseUrl}/approveRes`, data) 
  }

  rejectRes(idRes: string, reason: string){
    const data = {
      'id': idRes,
      'reason': reason
    }
    return this.http.post<Message>(`${this.baseUrl}/rejectRes`, data) 
  }

  lastThreeBad(houseId: string){
    const data = {'houseId': houseId}
    return this.http.post<Message>(`${this.baseUrl}/lastThreeBad`, data) 
  }

  getStats(houseId: string){
    const data = {'houseId': houseId}
    return this.http.post<Statistics>(`${this.baseUrl}/getStats`, data) 
  }
}
