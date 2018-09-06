import { User, validateUser } from './user.model'
import pick from 'lodash.pick'
import bcrypt from 'bcryptjs'

export const userController = {
  async signIn(req, res) {
    /* Check if the user exists */
    let user = await User.findOne({email: req.body.email})
      if(!user) {
      return res.status(400).send('Invalid email or password')
      }
    /* Decode hashed passwords */
      const password = await bcrypt.compare(req.body.password, user.password)
      if(!password) {
        return res.status(400).send('Invalid email or password')
      }
      const token = user.generateAuthToken()

      res.header('x-access-token', token).status(200).send(user)

    /*Create new access token */
  },
  async createUser(req, res) {
    const { error }  = await validateUser(req.body)
    if (error) {
      return res.status(400).send(error.details[0].context.label)
    }

    let user = new User(pick(req.body, ['email', 'password']))
    await user.save()

      const token = user.generateAuthToken()

      res.header('x-access-token', token).status(201).send(user)
  },

  async getUsers(req, res) {
    const result = await User.find({}).sort('createdAt')
    res.status(200).send(result)
  },

  async updateUser(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).send(user)
  },

  async deleteUser(req, res) {
    const user = await User.deleteOne({ _id: req.params.id })
    res.status(200).send(user)
  },
  async getProfile(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(user)
  },
  async getDashboard(req, res) {
    const user = await User.findById(req.user._id)
    return res.status(200).send(user)
  }
}


