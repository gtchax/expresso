import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import logger from 'morgan'


const app = express()
app.disable('x-powered-by')
app.set('port', 4000)

import  dbConnect  from './database'
import { router } from './router'
import { notFound, logErrors } from './middlewares'

dbConnect()

app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (app.get('env') === 'development') {
  app.use(logger('dev'))
}

app.use('/', router)
app.use(notFound)
app.use(logErrors)

const server = app.listen(app.get('port'), () => {
  console.log(`App is running on port ${server.address().port}`)
})


