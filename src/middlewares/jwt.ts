// jwt.js,token中间件
const jwt = require('express-jwt')
export default function () {
  return jwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }).unless({
    path: [
      '/admin/login',
      { url: '/user', methods: ['POST'] }
    ]
  })
}
