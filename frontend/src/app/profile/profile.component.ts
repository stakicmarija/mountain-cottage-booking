import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormsModule } from '@angular/forms'
import User from '../models/user'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnChanges{
  @Input() user: User | null = null

  ngOnInit(): void {
    if(!this.user){
      let u = localStorage.getItem('user')
      if(u)this.user = JSON.parse(u)
      this.local = true
    }
    if(this.user)this.populateFields(this.user)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.populateFields(this.user);
      this.local = false
    }
  }

  populateFields(user: User) {
    if(this.user){
      this.name = this.user.name
      this.surname = this.user.surname
      this.address = this.user.address
      this.phone = this.user.phone
      this.email = this.user.email
      this.card = this.user.card
      this.getCardType(this.card)
    }
  }

  private userService = inject(UserService)

  userUpdated : User = new User()
  name = ""
  surname = ""
  address = ""
  phone = ""
  email = ""
  profileImage = null as File | null
  card = ""
  cardType = ""
  error = ""
  local = false
  regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  regex_phone = /^(\+?\d{9,15})$/

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

  onSubmit() {
    if (!this.name || !this.surname || !this.address || !this.phone || !this.email || !this.card) {
      this.error = "Sva polja treba da budu popunjena"
      return
    }
    if(this.user) {
    if (this.name == this.user.name && this.surname == this.user.surname && this.address == this.user.address && this.phone == this.user.phone && this.email == this.user.email && this.card == this.user.card && !this.profileImage) {
      return
    }}
    if (!this.cardType) {
      this.error = "Nevalidan broj kartice"
      return
    }
    if(!this.regex_email.test(this.email)){
      this.error = "Neispravan format email-a"
      return
    }
   
    if(!this.regex_phone.test(this.phone)) {
      this.error = "Neispravan format broja telefona"
      return
    }

    this.error = ""
    const formData = new FormData()
    if(this.user) formData.append('username', this.user.username)
    formData.append('name', this.name)
    formData.append('surname', this.surname)
    formData.append('address', this.address)
    formData.append('phone', this.phone)
    formData.append('email', this.email)
    formData.append('card', this.card)

    if (this.profileImage) {
        formData.append('profileImage', this.profileImage)
    }

    this.userService.updateProfile(formData).subscribe((data) => {
        if (data) {
          if(this.local){
          this.userUpdated = data
          localStorage.setItem('user', JSON.stringify(this.userUpdated))}
          alert("Sačuvane izmene")
          window.location.reload()
        }
      })
    

  }



}
