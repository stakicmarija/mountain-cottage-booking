import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/message';
import House from '../models/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor() { }
  
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:4000/house'

  addHouse(formData: FormData){
    return this.http.post<Message>(`${this.baseUrl}/addHouse`, formData)
  }

  getHouse(id: string){
    const data = {'_id' : id }
    return this.http.post<House>(`${this.baseUrl}/getHouse`, data)
  }

  editHouse(formData: FormData){
    return this.http.post<Message>(`${this.baseUrl}/editHouse`, formData)
  }

  countHouses(){
    return this.http.get<number>(`${this.baseUrl}/countHouses`)
  }

  getHouses(){
    return this.http.get<House[]>(`${this.baseUrl}/getHouses`)
  }

  getOwnersHouses(username: string){
    const data = {'username': username}
    return this.http.post<House[]>(`${this.baseUrl}/getOwnersHouses`, data)
  }

  deleteHouse(id: string){
    const data = {'_id' : id }
    return this.http.post<Message>(`${this.baseUrl}/deleteHouse`, data)
  }

  deleteGalleryImage(id: string, name: string){
    const data = {
      'id': id,
      'name' : name
    }
    return this.http.post<Message>(`${this.baseUrl}/deleteGalleryImage`, data)
  }

  blockHouse(id: string){
    const data = {'id' : id }
    return this.http.post<Message>(`${this.baseUrl}/blockHouse`, data)
  }
}
