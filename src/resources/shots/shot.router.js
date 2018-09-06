import express from 'express'
import { sanitizeBody } from 'express-validator/filter'
import shotController from './shot.controller'
export const shotRouter = express.Router()

shotRouter
  .route('/')
  .get(shotController.getShots)
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
  .get(shotController.getShot)
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
    shotController.createShot
  )
  .delete(shotController.deleteShot)
