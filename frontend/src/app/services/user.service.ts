import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../models/user'
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:4000/user'

  login(username: string, password: string){
    const data = {
      'username': username,
      'password': password
    }
    return this.http.post<User>(`${this.baseUrl}/login`, data)
  }

  changePassword(username: string, pass: string, newPass: string){
    const data = {
      'username': username,
      'password': pass,
      'newPass': newPass
    }
    return this.http.post<Message>(`${this.baseUrl}/changePassword`, data)
  }

  notApproved(){
    return this.http.get<User[]>(`${this.baseUrl}/notApproved`)
  }

  approve(username:string){
    const data = {
      'username':username
    }
    return this.http.post<Message>(`${this.baseUrl}/approve`,data)
  }

  decline(username:string){
    const data = {
      'username':username
    }
    return this.http.post<Message>(`${this.baseUrl}/decline`,data)
  }


  getUser(username:string){
    const data = {
      'username':username
    }
    return this.http.post<User>(`${this.baseUrl}/getUser`,data)
  }
  
  deactivate(username:string){
    const data = {
      'username':username
    }
    return this.http.post<Message>(`${this.baseUrl}/deactivate`,data)
  }

  getEmail(email:string){
    const data = {
      'email' : email
    }
    return this.http.post<string>(`${this.baseUrl}/getEmail`,data)
  }
  
  register(formData: FormData){
    return this.http.post<Message>(`${this.baseUrl}/register`, formData)
  }

  updateProfile(formData:FormData){
    return this.http.post<User>(`${this.baseUrl}/updateProfile`, formData)
  }

}
