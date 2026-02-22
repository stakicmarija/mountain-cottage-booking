import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ""
  password = ""
  error=""
  user = new User()

  private router = inject(Router)
  private userService = inject(UserService)

  login(){
    if(!this.username || !this.password) this.error = "Popunite oba polja"
    else{
      this.userService.login(this.username, this.password).subscribe((data) => {
        if(data) {
            this.user = data
            if(this.user.type == 'tourist' || this.user.type == 'owner'){
            localStorage.setItem('user', JSON.stringify(this.user))
            this.router.navigate(['/profile/'+ this.username]).then(() => {
              window.location.reload()
            })}
            else this.error = "Neodgovarajuci tip korisnika"
        }
        else this.error = "Neispravni podaci"

      })
    }
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }
}
