import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Mongodb connect !'))
        .catch((err) => console.log(err))
}