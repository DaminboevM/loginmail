import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, min: 7,required: true},
    email: {type: String, unique: true, required: true},
    password: { type: String, min: 8, max: 16, required: true },
    isValid: {type: Boolean, default: false}
})

const UserModel = model('User', UserSchema)

export default UserModel