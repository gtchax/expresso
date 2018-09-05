import { User } from './user.model'
import pick from 'lodash.pick'

const userController = {
    async createUser(req, res) {
        try{
            let user = new User(pick(req.body, ['email', 'password', 'username']))
            await user.save()
            res.status(201).send(user)
        } catch(err) {
                res.status(400).send(err)
        }

    },

    async getUsers(req, res) {
        try {
            const result = await User.find({}).sort('createdAt')
            res.status(200).send(result)
        } catch (err) {
            res.status(400)
        }
    }
}

export default userController;