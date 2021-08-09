const jwt = require('jsonwebtoken')

export default async (user: any) => {
  const token = await jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_TIME // 授权时效24小时
  })
  return token
}
