import express from 'express'
import { userRouter, userController} from './resources/users'
import { shotRouter } from './resources/shots'
import { sanitizeBody } from 'express-validator/filter'
import { catchErrors, authorization } from './middlewares'
export const router = express.Router()


router.get('/', (req, res) => res.send('Welcome to the Expresso starter project'))
router.get('/about', (req, res) => res.send('About page'))

router.get('/signin',(req, res) => res.send('Sign in'))
router.post('/signin', userController.signIn)

router.get('/signup', (req, res) => res.send('Sign Up'))
router.post(
  '/signup',
  [
    sanitizeBody('email')
      .trim()
      .escape(),
      sanitizeBody('username')
          .trim()
          .escape(),
  ],
  catchErrors(userController.createUser)
)

router.get('/me', authorization, userController.getDashboard)

router.use('/users', userRouter)
router.use('/shots', shotRouter)