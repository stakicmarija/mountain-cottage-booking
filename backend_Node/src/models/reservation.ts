import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    guest: {type: String, required: true},
    houseId: {type: String, required: true},
    houseRef: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
    dateFrom: {type: Date, required: true, default: Date.now},
    dateTo: {type: Date, required: true},
    created: {type: Date, required: true},
    adults:  {type: Number, default: 1},
    children:  {type: Number},
    comment :  {type: String, default:""} ,
    rating:  {type: Number, default: 0},
    description: {type: String, maxlength:500},
    approved:  {type: String, default: ""},
    rejection :  {type: String, default:""} 
},{versionKey: false})

export default mongoose.model('Reservation', reservationSchema, 'reservations')