import express from 'express'
import User from '../controller/user.controller'

const router = express.Router()

router.post('/user', express.urlencoded({ extended: false }), User.post)
router.delete('/user/:userId', User.delete)
router.get('/user', User.get)

export default router
