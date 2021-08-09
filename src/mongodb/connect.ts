import mongoose from 'mongoose'

export default () => {
  const db = process.env.DATABASE_URL
  const connect = () => {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(() => {
      return console.info(`Successfully connected to ${db}`)
    }).catch(error => {
      console.error('Error connecting to database: ', error)
      return process.exit(1)
    })
  }
  connect()
  mongoose.connection.on('disconnected', connect)
}
