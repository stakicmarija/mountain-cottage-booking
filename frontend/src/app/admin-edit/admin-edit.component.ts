import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [FormsModule, ProfileComponent],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements OnInit {
  ngOnInit(): void {
    let username = this.route.snapshot.paramMap.get('username')
    if(username){
      this.userService.getUser(username).subscribe((data) => {
      if(data) this.user = data
        console.log(this.user)
    })
    }
    
  }

  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

   user : User = new User()
   error = ""

  deactivate(){
    if(confirm('Da li ste sigurni?')){
      this.userService.deactivate(this.user.username).subscribe((data) => {
        alert(data.message)
        this.router.navigate(['/admin'])
      })
    }
  }
}
