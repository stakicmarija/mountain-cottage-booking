import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../services/house.service';
import House from '../models/house';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../models/user';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  ngOnInit(): void {
    let u = localStorage.getItem('user')
    if(u){
      this.user = JSON.parse(u)
    }
    let h = this.route.snapshot.paramMap.get('id')
    if(h){
      this.houseService.getHouse(h).subscribe((data) => {
        if(data){
            this.house = data
            this.name = this.house.name
            this.place = this.house.place
            this.description = this.house.description
            this.contact = this.house.contact
            this.summerPrice = this.house.summerPrice
            this.winterPrice = this.house.winterPrice
            this.lat = this.house.lat
            this.long = this.house.long
            this.orgCoverImage = this.house.coverImage
        } 
      })
    }
    
  }

  private houseService = inject(HouseService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  house: House = new House()
  contact = ""
  name = ""
  place = ""
  description = ""
  summerPrice = 0
  winterPrice = 0
  lat = 0
  long = 0
  coverImage = null as File|null
  orgCoverImage = ""
  gallery : File[] = []
  message = ""
  user: User = new User()
  error =  ""

  deleteFromGallery(name: string){
    this.houseService.deleteGalleryImage(this.house._id, name).subscribe((data) => {
      alert(data.message)
      window.location.reload()
    })
  }

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

  onSubmit() {
    if(!this.name || !this.place || !this.description || !this.contact || !this.summerPrice || !this.winterPrice || !this.lat || !this.long) {
      this.error = "Popunite sva polja"
      return
    }
    const formData = new FormData()

    formData.append('id', this.house._id)
    formData.append('name', this.name)
    formData.append('place', this.place)
    formData.append('description', this.description)
    formData.append('contact', this.contact)
    formData.append('summerPrice', this.summerPrice+"")
    formData.append('winterPrice', this.winterPrice+"")
    formData.append('lat', this.lat+"")
    formData.append('long', this.long+"")

    if (this.coverImage) {
      formData.append('coverImage', this.coverImage)
    }

    if(this.gallery.length > 0){
      for (let img of this.gallery) {
        formData.append('gallery', img)
      }
    }


    this.houseService.editHouse(formData).subscribe(  (data) => {      
      if(data){
          this.message = data.message
          alert(this.message)
          this.router.navigate(['/my-houses/'+ this.user.username])
        }
    })
  }

}
