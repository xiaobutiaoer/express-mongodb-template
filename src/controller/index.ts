import { Router } from 'express'

export default async () => {
  const router = Router()
  router.use('*', (req, res) => {
    res.status(404).send('Sorry, It seems like you lost yourself >_< !')
  })

  return router
}
