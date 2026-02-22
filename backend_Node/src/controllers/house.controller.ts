import express from 'express'
import House from '../models/house'
import Reservation from '../models/reservation'
import User from '../models/user'

export class HouseController{

    getHouse = ((req:express.Request, res:express.Response) => {
        let id = req.body._id
        House.findOne({_id:id})
        .then((houses) => res.json(houses)) 
        .catch((err) => console.log(err))        
    })

    getHouses = (async (req:express.Request, res:express.Response) => {
        let now = new Date()
        const activeUserIds = await User.find({ active: true }).distinct('username');

        House.updateMany({blocked:true, blockedUntil: {$lt: now}}, {$set: {blocked: false, blockedUntil: null}}).then(() => {
           House.find({ owner: { $in: activeUserIds } })
            .then((houses) => res.json(houses)) 
            .catch((err) => console.log(err))    
        }).catch((err) => console.log(err))    
  
    })

    getOwnersHouses = ((req:express.Request, res:express.Response) => {
        let username = req.body.username
        let now = new Date()

        House.updateMany({blocked:true, blockedUntil: {$lt: now}}, {$set: {blocked: false, blockedUntil: null}}).then(() => {
            House.find({owner: username})
            .then((houses) => res.json(houses)) 
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))  
    })

    deleteHouse = ((req:express.Request, res:express.Response) => {
        let id = req.body._id

        Reservation.deleteMany({houseIdol:id}).then(del => {
            House.deleteOne({_id:id})
            .then((deleted) => { res.json({message: "Vikendica obrisana"}) 
            })
            .catch((err) => {
                res.json({message:"Neuspešno brisanje"})
                console.log(err)})
        }).catch((err) => console.log(err))
        
        
    })

    countHouses = (async (req:express.Request, res:express.Response) => {
        const activeUserIds = await User.find({ active: true }).distinct('username');
        House.countDocuments({blocked:false, owner: { $in: activeUserIds } })
        .then((count) => res.json(count))
        .catch((err) => console.log(err))
    })    

    deleteGalleryImage = ((req:express.Request, res:express.Response) => {
        let id = req.body.id
        let name = req.body.name
        console.log(name)

        House.updateOne({_id:id},{$pull: {gallery: name}})
        .then(ok => {
            res.json({message:"Obrisana slika iz galerije"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspešno brisanje"})
        })        
     })

    addHouse = ((req:express.Request, res:express.Response) => {
        const coverImage = req.files && 'coverImage' in req.files ?
        (req.files['coverImage'][0] as Express.Multer.File) : null

        const gallery = req.files && 'gallery' in req.files ?
        (req.files['gallery'] as Express.Multer.File[]) : []

        let house = {
            owner: req.body.owner,
            name: req.body.name,
            place: req.body.place,
            description: req.body.description,
            contact: req.body.contact,
            summerPrice: req.body.summerPrice,
            winterPrice: req.body.winterPrice,
            lat: req.body.lat,
            long: req.body.long,
            coverImage: coverImage ? coverImage.filename : '',
            gallery: gallery.map(file => file.filename)
        }

        new House(house).save().then(ok => {
            res.json({message:"Uspešno dodata vikendica"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspešno dodavanje"})
        })        
   
    })
    
    editHouse = ((req:express.Request, res:express.Response) => {
        let id = req.body.id

        let data: any = {
            name: req.body.name,
            place: req.body.place,
            description: req.body.description,
            contact: req.body.contact,
            summerPrice: req.body.summerPrice,
            winterPrice: req.body.winterPrice,
            lat: req.body.lat,
            long: req.body.long,
        }

        if(req.files && 'coverImage' in req.files ){
            data.coverImage = (req.files['coverImage'][0] as Express.Multer.File).filename 
        }

        House.findOne({_id:id}).then((house) => {
            if(!house) return

            if(req.files && 'gallery' in req.files){
                const newGallery = req.files['gallery'].map((f: any) => f.filename)
                data.gallery = house.gallery.concat(newGallery)
            }

            House.findOneAndUpdate({_id:id},{$set:data},{new:true})
            .then((updated) => {res.json({message: "Izmenjeni podaci"}) })
            .catch((err) => {
                res.json({message:"Neuspešno"})
                console.log(err)})
        })

    })
    
    blockHouse = ((req:express.Request, res:express.Response) => {
        let id = req.body.id 
        let now = new Date()

        House.updateOne({_id:id}, {$set:{blocked: true, blockedUntil: new Date(now.getTime() + 1000*60*60*48)}})
        .then((ok) => {
          if(ok.modifiedCount)  res.json({message:"Blokirano na 48h"})
          else res.json({message:"Neuspešno"})
        })
        .catch((err) => {
            res.json({message:"Neuspešno"})
            console.log(err)}
        )
    })
}

export default HouseController