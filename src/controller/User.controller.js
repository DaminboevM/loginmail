import { UserService } from "../service/User.service.js"

class UserController {
    constructor(){}

    async UserRegister (req, res) {
        try {
            const result = await UserService.register(req.body)
            res.status(201).json(result)
        } catch (error) {
            res.status(error.status || 500).send(error.message || 'Internal servr error')
        }
    }


    async UserLogin (req, res) {
        try {
            const result = await UserService.login(req.body)
            res.status(201).json(result)
        } catch (error) {
            res.status(error.status || 500).send(error.message || 'Internal servr error')
        }
    }


    async Confirem (req, res) {
        try {
            const result = await UserService.userConfirem(req.params.token)
            res.status(200).json(result)
        } catch (error) {
            res.status(error.status || 500).send(error.message || 'Internal servr error')
        }
    }

    
}

const userController = new UserController()

export default userController