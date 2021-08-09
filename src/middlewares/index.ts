// src/middlewares/index.js
import jwt from './jwt'
import { Router } from 'express'

export default function initMiddlewares () {
  const router = Router()
  router.use(jwt())
  return router
}
