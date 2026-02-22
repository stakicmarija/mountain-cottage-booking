import express from 'express'
import User from '../models/user'

export class OwnerController{

    countOwners = ((req:express.Request, res:express.Response) => {
        User.countDocuments({type:'owner', approved: true})
        .then((count) => res.json(count))
        .catch((err) => console.log(err))
    })

    getApproved = ((req:express.Request, res:express.Response) => {
        User.find({approved:true, type:'owner'})
        .then((o) => res.json(o))
        .catch((err) => console.log(err))    
    })    
}

export default OwnerController