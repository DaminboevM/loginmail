import bcrypt, { hash } from 'bcrypt'
import nodemailer from 'nodemailer'
import UserModel from '../module/User.module.js'
import jwt from '../utils/jwt.js'

export class UserService {
    constructor () {}



    static async register(body) {
        body.password = await bcrypt.hash(body.password, 10)

        const user = await UserModel.create(body)

        const token = jwt.sign({ email: user.email })

        const url = 'http://localhost:3000/api/confirem/' + token

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CHROME_ACC,
                pass: process.env.CHROME_PAROL
            }
        })

        const optionGmail = {
            from: '"Najot Ta\'lim" <m701rizo@gmail.com>',
            to: user.email,
            subject: 'Link orqal tasdiqlang !',
            html: `
                <a href="${url}">Havolani bosing</a>
                <p>Bu kodni hech kimga bermang</p>
            `
        }
        await transport.sendMail(optionGmail)

        return "Emailga tasdiqlash kodi yuborildi !"
    }



    static async login(body) {
        const user = await UserModel.findOne({ email: body.email })
        if (!user) throw new Error("Foydalanuvchi topilmadi!")

        const dehash = await bcrypt.compare(body.password, user.password)
        if (!dehash) throw new Error("Email yoki parol notogri!")

        if (!user.isValid) {
            const token = jwt.sign({ email: user.email })
            const url = 'http://localhost:3000/api/confirem/' + token
            
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.CHROME_PAROL,
                    pass: process.env.CHROME_PAROL
                }
            })

            const optionGmail = {
                from: '"Najot Ta\'lim" <m701rizo@gmail.com>',
                to: user.email,
                subject: 'Emailni tasdiqlash havolasi',
                html: `
                    <a href="${url}">Tasdiqlash uchun bu yerga bosing</a>
                    <p>Emailingiz tasdiqlanmagani sababli login qilish mumkin emas.</p>
                `
            }

            await transport.sendMail(optionGmail)

            throw new Error("Emailni tasdiqlasjh uchun yana havola yuborldi !")
        }

        const accessToken = jwt.sign({ name: user.name, email: user.email, _id: user._id })
        const refreshToken = jwt.signRef({ name: user.name, email: user.email, _id: user._id })

        return { accessToken, refreshToken }
    }





    static async userConfirem (token) {
        const { email } = jwt.verify(token)

        const user = await UserModel.findOne({email})

        if(!user) throw new Error('User mavjud emas !')

        user.isValid = true
        await user.save()

        return "Email tasdiqlandi !"
    }

}