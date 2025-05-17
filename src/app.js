import express from 'express'
import 'dotenv/config'
import { connectDB } from './config/Database.js'
import router from './router/User.route.js'
console.log(Math.floor(10000000 + Math.random() * 90000000))

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
await connectDB()
app.use('/api',router)

app.listen(PORT, () => console.log(`Listening on ${PORT}-port`))