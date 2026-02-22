import express from 'express'
import TouristController from '../controllers/tourist.controller'

const touristRouter = express.Router()

touristRouter
.route('/countTourists')
.get((req, res) => new TouristController().countTourists(req,res))

touristRouter
.route('/getApproved')
.get((req, res) => new TouristController().getApproved(req,res))


export default touristRouter