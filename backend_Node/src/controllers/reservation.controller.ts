import express from 'express'
import Reservation from '../models/reservation'
import House from '../models/house'
import User from '../models/user'
import mongoose from 'mongoose'

export class ReservationController{

    createReservation = ((req: express.Request, res: express.Response) => {
        House.findOne({ _id: req.body.houseId })
        .then((house) => {
            if (!house) {
                return res.json({ message: "Kuća nije pronađena" })
            }

            const reservation = {
                guest: req.body.guest,
                houseId: req.body.houseId, 
                houseRef: house._id,    
                dateFrom: req.body.dateFrom,
                dateTo: req.body.dateTo,
                created: new Date(),
                adults: req.body.adults,
                children: req.body.children,
                description: req.body.description
            }

            new Reservation(reservation).save()
            .then(() => {
                res.json({ message: "Uspešno" })
            })
            .catch((err) => {
                console.log(err)
                res.json({ message: "Neuspešno" })
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: "Greška pri traženju kuće" })
        })
    })

    checkAvailable = ((req:express.Request, res:express.Response) => {
        let houseId = req.body.houseId
        let dateFrom = req.body.dateFrom
        let dateTo = req.body.dateTo

        Reservation.findOne({houseId:houseId, approved:"approved", $or: [
            {
                dateFrom: {$lt: new Date(dateTo)},
                dateTo: {$gt: new Date(dateFrom)}
            }
        ]}).then(ok => {
            if (ok)  res.json({ message: "Datumi zauzeti" })
            else res.json(null)
        })
        .catch((err) => {
            console.log(err)
            res.json({message: "Neuspešno"})
        })        
    })

    getGuestsRes = ((req: express.Request, res: express.Response) => {
        let guest = req.body.guest

        Reservation.find({ guest: guest })
            .populate('houseRef')  
            .then((reservations) => res.json(reservations))
            .catch((err) =>console.log(err) )
    })

    deleteRes = ((req: express.Request, res: express.Response) => {
        let id = req.body.id

        Reservation.deleteOne({ _id:id })
            .then(ok => res.json({message: 'Rezervacija otkazana'}))
            .catch((err) =>{
                res.json({message: "Neuspešno"})
                console.log(err) 
            })
    })

    addRate = ((req: express.Request, res: express.Response) => {
        let id = req.body.id
        let houseId = req.body.houseId
        let house = new mongoose.Types.ObjectId(req.body.houseId.toString())
        let comment = req.body.comment
        let rating = req.body.stars

        Reservation.updateOne({ _id: id }, { $set: { comment: comment, rating: rating } })
            .then(ok => {
                Reservation.aggregate([
                { $match: { houseId: houseId, rating: { $gt: 0 } } },
                { $group: { _id: "$houseId", avgRate: { $avg: "$rating" } } }
                ]).then(result => {
                const avg = result[0]?.avgRate || 0

                House.updateOne({ _id: house }, { $set: { avgRating: avg } }).then((house) => {
                    res.json({ message: 'Ocenjeno!' })
                }).catch(err => {
                    console.log(err)
                    res.json({ message: "Neuspešno ocenjivanje" })
                })
                })
            
            })
            .catch((err) => {
            res.json({ message: "Neuspešno" })
            console.log(err)
            })
    })

    getHouseReservations  = ((req: express.Request, res: express.Response) => {
        let id = req.body.id

        Reservation.find({houseId:id})
        .then((reservations) => res.json(reservations))
        .catch((err) =>console.log(err) )
    })
    
    
    countDay = (async(req:express.Request, res:express.Response) => {
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const activeUserIds = await User.find({ active: true }).distinct('username');

        Reservation.countDocuments({created: {$gte: last24Hours},  guest: { $in: activeUserIds }})
        .then((count) => res.json(count))
        .catch((err) => console.log(err))
    })

    countWeek = (async(req:express.Request, res:express.Response) => {
        const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const activeUserIds = await User.find({ active: true }).distinct('username');

        Reservation.countDocuments({created: {$gte: last7Days},  guest: { $in: activeUserIds }})
        .then((count) => res.json(count))
        .catch((err) => console.log(err))
    })
    
    countMonth = (async(req:express.Request, res:express.Response) => {
        const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        const activeUserIds = await User.find({ active: true }).distinct('username');

        Reservation.countDocuments({created: {$gte: lastMonth},  guest: { $in: activeUserIds }})
        .then((count) => res.json(count))
        .catch((err) => console.log(err))
    })

    getOwnerReservations = (req: express.Request, res: express.Response) => {
        let ownerUsername = req.body.username

        House.find({ owner: ownerUsername }).select('_id').then((houses) => {
                let houseIds = houses.map(house => house._id)

                User.find({ active: true }).select('username').then((activeUsers) => {
                        const activeUserIds = activeUsers.map(user => user.username)

                        Reservation.find({houseId: { $in: houseIds },approved: { $nin: ["rejected"] },guest: { $in: activeUserIds }  })
                            .populate('houseRef') 
                            .then((requests) => {
                                res.json(requests)
                            }).catch((err) => {console.log(err)})

                    }).catch((err) => {console.log(err)})
            }).catch((err) => {console.log(err)})
        }

    approveRes = ((req:express.Request, res:express.Response) => {
        let id = req.body.id

        Reservation.updateOne({_id:id},{$set: {approved:"approved"}}).then((ok) => {
            res.json({message: 'Prihvacena rezervacija'})
        }).catch((err) => console.log(err))
    })

    rejectRes = ((req:express.Request, res:express.Response) => {
        let id = req.body.id
        let reason = req.body.reason

        Reservation.updateOne({_id:id},{$set: {approved:"rejected", rejection:reason}}).then((ok) => {
            res.json({message: 'Odbijena rezervacija'})
        }).catch((err) => console.log(err))
    })

    lastThreeBad = ((req:express.Request, res:express.Response) => {
        let houseId = req.body.houseId

        Reservation.find({houseId: houseId}).then((reservations) => {
            if(reservations.length < 3) return  res.json({success:0})
            reservations.sort((a, b) => b.created.getTime() - a.created.getTime())
            let three = 0
            let i = 0
            let length = 0
            
            while(i<3 && length < reservations.length){
                if(reservations[length].rating == 1) {
                    three++
                }
                if(reservations[length].rating > 0){
                    i++
                }
                length++
            }
            if(three == 3){
                res.json({success:1})
            } 
            else res.json({success:0})
        }).catch((err) => console.log(err))
    })

    getStats = ((req:express.Request, res:express.Response) => {
        let houseId = req.body.houseId

        Reservation.find({houseId:houseId, approved:'approved'}).then((reservations) => {
            let monthly = [0,0,0,0,0,0,0,0,0,0,0,0]   
            let weekday = [0, 0] //weekday, weekend
            reservations.forEach(res => {
                const start = new Date(res.dateFrom)
                const end = new Date(res.dateTo)
                let month = new Date(res.dateFrom).getMonth()
                monthly[month]++
                let curr = new Date(res.dateFrom)
                while(curr <= end){
                    let day = curr.getDay(); //0=nedelja, 6=subota
                    (day === 0 || day === 6) ? weekday[1]++ : weekday[0]++;
                    curr.setDate(curr.getDate() + 1)
                }
                
            })
            res.json({houseId:houseId, monthly: monthly, weekday: weekday})

        }).catch((err) => console.log(err))
    })

}

export default ReservationController