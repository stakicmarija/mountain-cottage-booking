import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import User from '../models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if(user){
      this.user = JSON.parse(user)
      this.type = this.user.type
    }
  }

  private router = inject(Router)

  user: User = new User()
  type = ""
  burgerOpen = false

  logOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/login']).then(() => {
      window.location.reload()
    })
  }

  toggleMenu(){
    this.burgerOpen = !this.burgerOpen
  }

  goToPassword(){
    this.router.navigate(['/password/'+ this.user.username])
  }

  goToProfile(){
    this.router.navigate(['/profile/'+ this.user.username])
  }

  goToMyHouses(){
     this.router.navigate(['/my-houses/'+ this.user.username])
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
  goHome(){
    this.router.navigate(['/'])
  }

}
