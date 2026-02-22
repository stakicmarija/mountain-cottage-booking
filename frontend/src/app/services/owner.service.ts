import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:4000/owner'

  countOwners(){
    return this.http.get<number>(`${this.baseUrl}/countOwners`)
  }
  getApproved(){
    return this.http.get<User[]>(`${this.baseUrl}/getApproved`)
  }
}
