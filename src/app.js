import express from 'express'
import bodyParser from 'body-parser';
import { dbConnect } from './database'
import { router } from './router'
import { userRouter } from './resources/users/user.router'


const app = express()
app.set('port', 4000)
dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended": true}))


app.use('/', router)
app.use('/users', userRouter)

const server = app.listen(app.get('port'), () => {
  console.log(`App is running on port ${server.address().port}`)
})

// ESM syntax is supported.
export {}
