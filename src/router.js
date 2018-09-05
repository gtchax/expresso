import express from 'express'
import userController from './resources/users/user.controller'
import { sanitizeBody } from 'express-validator/filter'
export const router = express.Router()
router.get('/', (req, res) =>
  res.send('Welcome to the Expresso starter project')
)

// router.get('/signin', userController.createUser())

router.post('/signup', [
    sanitizeBody('email')
        .trim()
        .escape()
], userController.createUser)