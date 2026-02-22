import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import userRouter from './routers/user.router'
import touristRouter from './routers/tourist.router'
import ownerRouter from './routers/owner.router'
import houseRouter from './routers/house.router'
import reservationRouter from './routers/reservation.router'

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/project')
const connection = mongoose.connection
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router()
app.use('', router)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

router.use('/user', userRouter)
router.use('/tourist', touristRouter)
router.use('/owner', ownerRouter)
router.use('/house', houseRouter)
router.use('/reservation', reservationRouter)

app.listen(4000, ()=>console.log('Express running on port 4000'))
