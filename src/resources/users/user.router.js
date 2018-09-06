import express from 'express'
import userController from './user.controller'
import { sanitizeBody } from 'express-validator/filter'
export const userRouter = express.Router()

userRouter.route('/').get(userController.getUsers)

userRouter
  .route('/:id')
  .get(userController.getProfile)
  .put(
    [
      sanitizeBody('email')
        .trim()
        .escape(),
      sanitizeBody('username')
        .trim()
        .escape(),
      sanitizeBody('bio')
        .trim()
        .escape(),
      sanitizeBody('url')
        .trim()
        .escape()
    ],
    userController.updateUser
  )
  .delete(userController.deleteUser)
// .put()
// .delete()
