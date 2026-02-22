import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
    owner : {type: String, required: true},
    name : {type: String, required: true},
    place  : {type: String, required: true},
    description  : {type: String, required: true},
    contact  : {type: String, required: true},
    summerPrice  :  {type: Number, required: true},
    winterPrice  :  {type: Number, required: true},
    lat  :  {type: Number, required: true},
    long  :  {type: Number, required: true},
    coverImage :  {type: String} ,
    gallery: {type: [String], required: true},
    avgRating: {type: Number, default: 0},
    blocked: {type: Boolean, default: false},
    blockedUntil: {type: Date, default: null}

},{versionKey: false})

export default mongoose.model('House', houseSchema, 'houses')