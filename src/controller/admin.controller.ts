import { Request, Response } from 'express'
import userService from '../services/user.services'
import { createValidation } from '../validates/user.validates'
import getToken from '../helper/token'
import cc from '../helper/cc'

class AdminController {
  userService: any

  constructor () {
    this.userService = userService()
  }

  login = cc(async (req: Request, res: Response) => {
    await createValidation.validate(req.body)
    const { password: userInput, username } = req.body
    const user = await this.userService.findOne(username)
    if (!user) {
      // 用户不存在
      res.status(400).send({ code: res.statusCode, message: '不存在该用户，请先去注册' })
    } else if (userInput !== user.password) {
      // 密码错误
      res.status(403).send({ code: res.statusCode, message: '密码错误' })
    } else {
      // 生成token返回
      const { username, id, role } = user
      // 此处不能直接把user传进去
      const token = await getToken({ username, id })
      res.send({
        code: res.statusCode,
        message: '登陆成功',
        data: {
          token,
          user: {
            username,
            id,
            role
          }
        }
      })
    }
  })
}

export default new AdminController()
