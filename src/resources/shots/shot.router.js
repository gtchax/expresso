import express from 'express'
import { sanitizeBody } from 'express-validator/filter'
import { shotController } from './shot.controller'
import { catchErrors } from './../../middlewares'
export const shotRouter = express.Router()

shotRouter
  .route('/')
  .get(catchErrors(shotController.getShots))
  .post(
    [
      sanitizeBody('title')
        .trim()
        .escape(),
      sanitizeBody('description')
        .trim()
        .escape(),
      sanitizeBody('author')
        .trim()
        .escape()
    ],
    shotController.createShot
  )

shotRouter
  .route('/:id')
  .get(catchErrors(shotController.getShot))
  .put(
    [
      sanitizeBody('title')
        .trim()
        .escape(),
      sanitizeBody('description')
        .trim()
        .escape(),
      sanitizeBody('author')
        .trim()
        .escape()
    ],
    catchErrors(shotController.createShot)
  )
  .delete(shotController.deleteShot)
