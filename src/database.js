import mongoose from 'mongoose'
import appConfig from './config'


const dbConnect = async (config = appConfig) => {
  try {
      await mongoose.connect(config.database,{ useNewUrlParser: true })
          console.log(`MongoDb connected successfully :)`)
  } catch(error) {
     console.error(`Something went wrong :( ${error}`)
  }
}

export default dbConnect
