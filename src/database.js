import mongoose from 'mongoose'
import appConfig from './config'

export const dbConnect = (config = appConfig) => {
  return mongoose
    .connect(config.database, { useNewUrlParser: true })
    .then(() => console.log(`MongoDb connected successfully :)`))
    .catch(error => console.error(`Something went wrong :( ${error}`))
}
