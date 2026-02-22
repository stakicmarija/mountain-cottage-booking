import express from 'express'
import OwnerController from '../controllers/owner.controller'

const ownerRouter = express.Router()

ownerRouter
.route('/countOwners')
.get((req, res) => new OwnerController().countOwners(req,res))

ownerRouter
.route('/getApproved')
.get((req, res) => new OwnerController().getApproved(req,res))


export default ownerRouter