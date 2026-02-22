import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserType(){
    let u = localStorage.getItem('user')
    if(u) return JSON.parse(u).type
    return null
  }

  isAdmin(): boolean{
    return this.getUserType() == 'admin'
  }

  isTourist(): boolean{
    return this.getUserType() == 'tourist'
  }

  isOwner(): boolean{
    return this.getUserType() == 'owner'
  }

  touristOrOwner(): boolean{
    let type = this.getUserType()
    return type == 'tourist' || type == 'owner'
  }
}
