import { User, validateUser } from './user.model'
import pick from 'lodash.pick'

const userController = {
  async createUser(req, res) {
    try {
      const { error } = validateUser(req.body)
      if (error) {
        return res.status(400).send(error.details[0].context.label)
      }

      let user = new User(pick(req.body, ['email', 'password', 'username']))
      await user.save()
      res.status(201).send(user)
    } catch (err) {
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
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.deleteOne({ _id: req.params.id })
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).send('User not found')
      }
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  async getDashboard(req, res) {
    try {
      const user = await User.findById(req.user._id)
      return res.status(200).send('You must sign in first')
    } catch (err) {
      res.status(400).send(err)
    }
  }
}

export default userController
