import express from 'express'
import UserController from '../controllers/user.controller'
import upload from '../middlewares/multer'

const userRouter = express.Router()

userRouter
.route('/login')
.post((req, res) => new UserController().login(req,res)) 

userRouter
.route('/changePassword')
.post((req, res) => new UserController().changePassword(req,res))

userRouter
.route('/notApproved')
.get((req, res) => new UserController().notApproved(req,res))

userRouter
.route('/approve')
.post((req, res) => new UserController().approve(req,res))

userRouter
.route('/decline')
.post((req, res) => new UserController().decline(req,res))

userRouter
.route('/getUser')
.post((req, res) => new UserController().getUser(req,res))

userRouter
.route('/deactivate')
.post((req, res) => new UserController().deactivate(req,res))

userRouter
.route('/getEmail')
.post((req, res) => new UserController().getEmail(req,res))

userRouter
.route('/register')
.post(upload.single('profileImage'), (req, res) => new UserController().register(req,res))

userRouter
.route('/updateProfile')
.post(upload.single('profileImage'), (req, res) => new UserController().updateProfile(req,res))

export default userRouter