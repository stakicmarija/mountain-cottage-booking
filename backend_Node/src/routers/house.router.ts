import express from 'express'
import HouseController from '../controllers/house.controller'
import upload from '../middlewares/multer'

const houseRouter = express.Router()

houseRouter
.route('/getHouse')
.post((req, res) => new HouseController().getHouse(req,res))

houseRouter
.route('/getHouses')
.get((req, res) => new HouseController().getHouses(req,res))

houseRouter
.route('/deleteGalleryImage')
.post((req, res) => new HouseController().deleteGalleryImage(req,res))

houseRouter
.route('/deleteHouse')
.post((req, res) => new HouseController().deleteHouse(req,res))

houseRouter
.route('/countHouses')
.get((req, res) => new HouseController().countHouses(req,res))

houseRouter
.route('/addHouse')
.post(upload.fields([
        { name: "coverImage", maxCount: 1},
        { name: "gallery", maxCount: 10}
    ]), (req, res) => new HouseController().addHouse(req,res))

houseRouter
.route('/editHouse')
.post(upload.fields([
        { name: "coverImage", maxCount: 1},
        { name: "gallery", maxCount: 10}
    ]), (req, res) => new HouseController().editHouse(req,res))

houseRouter
.route('/getOwnersHouses')
.post((req, res) => new HouseController().getOwnersHouses(req,res))

houseRouter
.route('/blockHouse')
.post((req, res) => new HouseController().blockHouse(req,res))


export default houseRouter