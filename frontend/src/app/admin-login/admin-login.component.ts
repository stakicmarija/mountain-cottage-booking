import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username = ""
  password = ""
  error = ""
  user: User = new User()

  private userService = inject(UserService)
  private router = inject(Router)

  login(){
    if(!this.username || !this.password) this.error = "Popunite oba polja"
    else{
      this.userService.login(this.username, this.password).subscribe((data) => {
        if(data) {
            this.user = data
            if(this.user.type == 'admin'){
            localStorage.setItem('user', JSON.stringify(this.user))
            this.router.navigate(['/admin']).then(() => {
              window.location.reload()
            })}
            else this.error = "Niste admin"
        }
        else this.error = "Neispravni podaci"
      })
    }
  }

}
