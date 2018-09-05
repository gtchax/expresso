import express from 'express'
import userController from './resources/users/user.controller'
export const router = express.Router()

router.get('/', (req, res) =>
  res.send('Welcome to the Expresso starter project')
)

// router.get('/signin', userController.createUser())

router.post('/signup', userController.createUser)