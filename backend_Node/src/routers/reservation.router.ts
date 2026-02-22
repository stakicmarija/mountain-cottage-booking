import express from 'express'
import ReservationController from '../controllers/reservation.controller'

const reservationRouter = express.Router()

reservationRouter
.route('/createReservation')
.post((req, res) => new ReservationController().createReservation(req,res))

reservationRouter
.route('/checkAvailable')
.post((req, res) => new ReservationController().checkAvailable(req,res))

reservationRouter
.route('/getGuestsRes')
.post((req, res) => new ReservationController().getGuestsRes(req,res))

reservationRouter
.route('/deleteRes')
.post((req, res) => new ReservationController().deleteRes(req,res))

reservationRouter
.route('/addRate')
.post((req, res) => new ReservationController().addRate(req,res))

reservationRouter
.route('/getHouseReservations')
.post((req, res) => new ReservationController().getHouseReservations(req,res))

reservationRouter
.route('/countDay')
.get((req, res) => new ReservationController().countDay(req,res))

reservationRouter
.route('/countWeek')
.get((req, res) => new ReservationController().countWeek(req,res))

reservationRouter
.route('/countMonth')
.get((req, res) => new ReservationController().countMonth(req,res))

reservationRouter
.route('/getOwnerReservations')
.post((req, res) => new ReservationController().getOwnerReservations(req,res))

reservationRouter
.route('/approveRes')
.post((req, res) => new ReservationController().approveRes(req,res))

reservationRouter
.route('/rejectRes')
.post((req, res) => new ReservationController().rejectRes(req,res))

reservationRouter
.route('/lastThreeBad')
.post((req, res) => new ReservationController().lastThreeBad(req,res))

reservationRouter
.route('/getStats')
.post((req, res) => new ReservationController().getStats(req,res))

export default reservationRouter 