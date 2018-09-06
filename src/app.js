import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import logger from 'morgan'
import { dbConnect } from './database'
import { router } from './router'
import { userRouter } from './resources/users/user.router'
import { shotRouter } from './resources/shots/shot.router'
import { notFound, logErrors } from './middlewares'

const app = express()
app.disable('x-powered-by')
app.set('port', 4000)
dbConnect()

app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (app.get('env') === 'development') {
  app.use(logger('dev'))
}

app.use('/', router)

app.use('/users', userRouter)
app.use('/shots', shotRouter)
app.use(notFound)
app.use(logErrors)

const server = app.listen(app.get('port'), () => {
  console.log(`App is running on port ${server.address().port}`)
})

// ESM syntax is supported.
export {}
