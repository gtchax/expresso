import express from 'express'
import userController from './user.controller'
import { sanitizeBody } from 'express-validator/filter'
import { catchErrors } from './../../middlewares'
export const userRouter = express.Router()

userRouter.route('/').get(catchErrors(userController.getUsers))

userRouter
  .route('/:id')
  .get(catchErrors(userController.getProfile))
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
    catchErrors(userController.updateUser)
  )

  .delete(catchErrors(userController.deleteUser))
// .put()
// .delete()
