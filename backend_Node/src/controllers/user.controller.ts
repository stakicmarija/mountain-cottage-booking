import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'

export class UserController{
    saltRounds = 10

    login = ((req:express.Request, res:express.Response) => {
        let user = req.body.username
        let pass = req.body.password  

        User.findOne({username: user,  approved: true, active: true})
        .then((user) => {
            if(!user) return res.json(null)
            bcrypt.compare(pass, user.password).then((same) => {
                if(same) res.json(user)
                else res.json(null)
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    })

    changePassword =  ((req:express.Request, res:express.Response) => {
        let user = req.body.username
        let pass = req.body.password  
        let newPass = req.body.newPass  

        bcrypt.hash(newPass, this.saltRounds).then(hashedPassword => {
            User.findOne({username:user})
            .then((user) =>{
                if(!user) return res.json({ success: 0,message: 'Neuspešno'})
                bcrypt.compare(pass, user.password).then((same) => {
                    if(same){
                         User.updateOne({username:user.username}, {$set:{password: hashedPassword}})
                        .then((updated) =>{
                            if(updated.matchedCount == 0) res.json({ success: 0, message: 'Neuspešno'})
                            else res.json({ success: 1, message: 'Promenjena lozinka'})
                        })
                        .catch((err) => {
                            res.json({ success: 0, message: 'Neuspešno'})
                            console.log(err)
                        })
                    }else return res.json({ success: 0, message: 'Pogresno ste uneli staru lozinku'})
                }).catch((err) => console.log(err))
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    })

    notApproved = ((req:express.Request, res:express.Response) => {
        User.find({approved: false, active: true})
        .then((users) =>res.json(users))
        .catch((err) => console.log(err))
    })

    approve = ((req:express.Request, res:express.Response) => {
        let user = req.body.username

        User.updateOne({username:user},{$set:{approved:true}})
        .then((users) =>res.json({message: "Korisnički zahtev prihvaćen"}))
        .catch((err) => { res.json({message: 'Neuspešno'})
        console.log(err)})
    })

    decline = ((req:express.Request, res:express.Response) => {
        let user = req.body.username

        User.updateOne({username:user},{$set:{approved:false, active:false}})
        .then((users) =>res.json({message: "Korisnički zahtev odbijen"}))
        .catch((err) => { res.json({message: 'Neuspešno'})
        console.log(err)})
    })

    getUser = ((req:express.Request, res:express.Response)  => {
        let user = req.body.username

        User.findOne({username: user})
        .then((user) => res.json(user))
        .catch((err) => console.log(err))
    })

    deactivate = ((req:express.Request, res:express.Response)  => {
        let user = req.body.username

        User.updateOne({username: user},{$set:{active: false, approved: false}})
        .then((user) =>res.json({message: 'Korisnik deaktiviran'}))
        .catch((err) => {
            res.json({message:'Neuspešno'})
            console.log(err)})
    })

    getEmail = ((req:express.Request, res:express.Response)  => {
        let email = req.body.email

        User.findOne({email: email})
        .then((user) =>res.json(user?.email))
        .catch((err) => {console.log(err)})
    })

    register = ((req:express.Request, res:express.Response) => {
        let pass = req.body.password
         bcrypt.hash(pass, this.saltRounds).then(hashedPassword => {
            let user = {
                username: req.body.username,
                password: hashedPassword,
                type: req.body.type,
                name: req.body.name,
                surname: req.body.surname,
                gender: req.body.gender,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                profileImage: req.file ? req.file.filename : "",
                card: req.body.card,
                approved: false,
                active: true
            }
                new User(user).save().then(ok => {
                    res.json({message:"Zahtev poslat administratoru"})
                }).catch((err) => {
                    console.log(err)
                    res.json({message: "Neuspesna registracija"})
                })
         }).catch((err) => console.log(err))



    })

    updateProfile = ((req:express.Request, res:express.Response) => {
        let username = req.body.username
        let profileImage;

        let updates = {
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            card: req.body.card,
        }as {
            name: any;
            surname: any;
            address: any;
            phone: any;
            email: any;
            card: any;
            profileImage?: string;
        }


        if(req.file){
         updates.profileImage = req.file.filename
        }

        User.findOneAndUpdate({username:username},{$set:updates}, {new:true})
        .then((updated) => {res.json(updated)})
        .catch((err) => {console.log(err)})

    })

}

export default UserController