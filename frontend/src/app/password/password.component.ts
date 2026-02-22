import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements OnInit{
  ngOnInit(): void {
    let u = this.route.snapshot.paramMap.get('username')
    if(u) this.username = u
  }

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private userService = inject(UserService)

  username = ""
  oldPassword = ""
  newPassword = ""
  newAgain = ""
  error = ""
  regex = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%&*^+<>?|-]).{6,10}$/


  change(){
    if(!this.oldPassword || !this.newPassword || !this.newAgain) this.error = "Popunite sva polja"
    else if(this.oldPassword == this.newPassword) this.error = "Stara i nova lozinka ne smeju biti iste"
    else if(this.newPassword != this.newAgain) this.error = "Nova lozinka i ponovljena nova lozinka nisu niste"
    else if(!this.regex.test(this.newPassword)) this.error = "Slaba lozinka"
    else{
      this.userService.changePassword(this.username,this.oldPassword ,this.newPassword).subscribe((data) => {
        if(data.success){
          alert('Promenjena lozinka')
          localStorage.removeItem('user')
          this.router.navigate(['/login'])
          .then(() => window.location.reload())
        } 
        else this.error = data.message

      })
    }
  }
}
