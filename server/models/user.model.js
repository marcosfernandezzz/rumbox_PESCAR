import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const User = new mongoose.Schema({
    name : { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}) 

export default mongoose.model('User', User) 


