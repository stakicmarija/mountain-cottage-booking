import express from 'express'
import User from '../models/user'

export class TouristController{

    countTourists = ((req:express.Request, res:express.Response) => {
        User.countDocuments({type:'tourist', approved: true})
        .then((count) => res.json(count))
        .catch((err) => console.log(err))    
    })

    getApproved = ((req:express.Request, res:express.Response) => {
        User.find({approved:true, type:'tourist'})
        .then((t) => res.json(t))
        .catch((err) => console.log(err))    
    })
    
}

export default TouristController