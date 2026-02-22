import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = ""
  password = ""
  type = ""
  name = ""
  surname = ""
  gender = ""
  address = ""
  phone = ""
  email = ""
  profileImage = null as File | null
  card = ""
  error = ""
  regex_pass = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%&*^+<>?|-]).{6,10}$/
  regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  regex_username = /^[a-z0-9_]{3,16}$/
  regex_phone = /^(\+?\d{9,15})$/
  message = ""
  cardType = ""

  private router = inject(Router)
  private userService = inject(UserService)

  onFileSelected(event: any){
    const file:File = event.target.files[0]
    const allowedTypes = ['image/png', 'image/jpeg']
      
    if (!file) return
    if (!allowedTypes.includes(file.type)) {
      this.error = "Dozvoljeni formati su JPG i PNG"
      this.profileImage = null
      return
    }

    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      const width = image.width
      const height = image.height

      if (width < 100 || width > 300 || height < 100 || height > 300) {
        this.error = "Neprilagodjena veličina slike"
        this.profileImage = null
      } else {
        this.profileImage = file
        this.error = ""
      }
    }
  }

  getCardType(card: string){
    this.cardType = ""
    switch (card.length){
      case 15:
        if((/^300|^301|^302|^303|^36|^38/).test(card)) this.cardType = 'diners-club'
        break
      case 16:
        if((/^51|^52|^53|^54|^55/).test(card)) this.cardType = 'master'
        else if((/^4539|^4556|^4916|^4532|^4929|^4485|^4716/).test(card)) this.cardType = 'visa'
        break
      default:
        this.cardType = ""
    }

  }

  onSubmit(){
    this.userService.getUser(this.username).subscribe((data) => {
      if(data && data.username == this.username){
        this.error = "Zauzeto korisničko ime"
        return
      }

      this.userService.getEmail(this.email).subscribe((data) =>{
        if(data && data == this.email){
           this.error = "Zauzet email"
          return
        }
     
    
    if(!this.username || !this.password || !this.type || !this.name || !this.surname || !this.gender || !this.address || !this.phone || !this.email || !this.card) this.error = "Sva polja su obavezna"
    else if(this.password.length > 10) this.error = "Lozinka sme da ima do 10 karaktera"
    else if(!this.regex_email.test(this.email)) this.error = "Neispravan format email-a"
    else if(!this.regex_username.test(this.username)) this.error = "Neispravan format username-a"
    else if(!this.regex_phone.test(this.phone)) this.error = "Neispravan format broja telefona"
    else if(!this.regex_pass.test(this.password)) this.error = "Slaba lozinka" 
    else if(!this.cardType) this.error = "Nevalidan broj kartice"
    else{
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('type', this.type)
      formData.append('name', this.name)
      formData.append('surname', this.surname)
      formData.append('gender', this.gender)
      formData.append('address', this.address)
      formData.append('phone', this.phone)
      formData.append('email', this.email)
      formData.append('card', this.card)
      if(this.profileImage){
        formData.append('profileImage', this.profileImage)
      }
      this.userService.register(formData).subscribe((data) => {
        if(data){
          this.message = data.message
          alert(this.message)
          this.router.navigate(['/'])
        }
      })
      
    } })  })
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }

}
