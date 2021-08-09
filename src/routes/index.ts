import { Router } from 'express'
import user from './user'
import admin from './admin'

export default () => {
  const router = Router()
  router.use(user)
  router.use('/admin', admin)
  router.use('*', (req, res) => {
    res.status(404).send('Sorry, It seems like you lost yourself >_< !')
  })
  return router
}
