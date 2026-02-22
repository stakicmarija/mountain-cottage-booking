import { Component, inject, OnInit } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../services/house.service';
import User from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if(user){
      this.user = JSON.parse(user)
    }
  }

  contact = ""
  name = ""
  place = ""
  description = ""
  summerPrice = ""
  winterPrice = ""
  mainPic = ""
  lat = ""
  long = ""
  coverImage = null as File|null
  gallery: File[] = []
  user: User = new User()
  message = ""
  error = ""
  jsonFile = null as File|null
  jsonObject : any = null
  

  private houseService = inject(HouseService)
  private router = inject(Router)

  onFileSelected(event: any){
    const file:File = event.target.files[0]
    if(file){
      this.coverImage = file
    }
  }

  onGallerySelected(event: any){
    const files = event.target.files
    if(files){
      this.gallery = Array.from(files)
    }
  }

  onJsonSelected(event: any){
    const file:File = event.target.files[0]
    if(!file) return

    this.jsonFile = file
    const fileReader = new FileReader()
    fileReader.readAsText(file, "UTF-8")

    fileReader.onload = () => {
      if(!fileReader.result) return
      this.jsonObject = JSON.parse(fileReader.result.toString())

      this.name = this.jsonObject.name
      this.place = this.jsonObject.place
      this.description = this.jsonObject.description
      this.contact = this.jsonObject.contact
      this.summerPrice = this.jsonObject.summerPrice
      this.winterPrice = this.jsonObject.winterPrice 
      this.lat = this.jsonObject.lat 
      this.long = this.jsonObject.long 
    }

  }

  onSubmit() {
    if(!this.name || !this.place || !this.description || !this.contact || !this.summerPrice || !this.winterPrice || !this.lat || !this.long || !this.coverImage || this.gallery.length == 0){
      this.error = "Sva polja su obavezna"
      return
    }
    if(!this.coverImage || !this.gallery) {
      this.error = "Sva polja su obavezna"
      return
    }
    const formData = new FormData()

    formData.append('owner', this.user.username) 
    formData.append('name', this.name)
    formData.append('place', this.place)
    formData.append('description', this.description)
    formData.append('contact', this.contact)
    formData.append('summerPrice', this.summerPrice)
    formData.append('winterPrice', this.winterPrice)
    formData.append('lat', this.lat)
    formData.append('long', this.long)

    if (this.coverImage) {
      formData.append('coverImage', this.coverImage)
    }

    for (let img of this.gallery) {
      formData.append('gallery', img)
    }

    this.houseService.addHouse(formData).subscribe(  (data) => {      
      if(data){
          this.message = data.message
          alert(this.message)
          window.location.reload()
        }
    })
  }
}
