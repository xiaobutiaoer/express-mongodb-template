import { Request, Response } from 'express'
// import bodyParser from 'body-parser'
import userService from '../services/user.services'
import { createValidation } from '../validates/user.validates'
import cc from '../helper/cc'

class UserController {
  userService: any

  constructor () {
    this.userService = userService()
  }

  post = cc(async (req: Request, res: Response) => {
    await createValidation.validate(req.body)
    const { username } = req.body
    const user = await this.userService.findOne(username)
    if (user) {
      res.status(400).send({
        code: res.statusCode,
        message: '用户名重复'
      })
    } else {
      const user = await this.userService.create(Object.assign({}, req.body))
      const { username, role } = user
      res.send({
        code: res.statusCode,
        message: '注册成功',
        data: {
          username,
          role
        }
      })
    }
  })

  delete = cc(async (req: Request, res: Response) => {
    const { userId } = req.params
    const user = await this.userService.delete(userId)
    res.send({
      code: res.statusCode,
      message: user ? '删除成功' : '没有此用户'
    })
  })

  get = async (req: Request, res: Response) => {
    const data = await this.userService.get({ ...req.query })
    res.send({
      code: res.statusCode,
      data
    })
  }
}

export default new UserController()
