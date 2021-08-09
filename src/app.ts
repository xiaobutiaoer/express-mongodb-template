import express from 'express'
import dotenv from 'dotenv'
import connect from './mongodb/connect'
import initRoutes from './routes'
import initMiddlewares from './middlewares'
import errorHandler from './helper/error'

dotenv.config()

const app = express()
const port = parseInt(process.env.PORT || '9000')

async function bootstrap () {
  // 连接数据库
  connect()
  // 初始化中间件
  app.use(await initMiddlewares())
  // 初始化路由
  app.use(await initRoutes())
  // 数据错误处理
  app.use(errorHandler)

  app.listen(port)
  console.log(`> Started on port ${port}`)
}

bootstrap()
