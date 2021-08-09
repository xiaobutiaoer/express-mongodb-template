import express from 'express'
import Admin from '../controller/admin.controller'

const router = express.Router()

router.post('/login', express.urlencoded({ extended: false }), Admin.login)

export default router
