import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password  : {type: String, required: true},
    type  : {type: String, required: true},
    name  : {type: String, required: true},
    surname  : {type: String, required: true},
    gender  : {type: String, required: true, enum: ['male', 'female']},
    address  :  {type: String, required: true},
    phone  :  {type: String, required: true},
    email  :  {type: String, required: true},
    card  :  {type: String, required: true},
    profileImage :  {type: String} ,
    approved: {type: Boolean},
    active: {type: Boolean}
},{versionKey: false})

export default mongoose.model('User', userSchema, 'users')