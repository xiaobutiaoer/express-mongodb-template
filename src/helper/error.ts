const codeMap: any = {
  ValidationError: 400,
  UnauthorizedError: 401,
  Default: 500
}

const msgMap: any = {
  UnauthorizedError: 'invalid token',
  Default: 'Internal server error'
}

export default (err: any, req: any, res: any, next: any) => {
  // 最后一层中间件，捕获token验证的问题
  const { name, message } = err
  if (res.headersSent) {
    // 如果是在返回响应结果时发生了异常
    // 那么交给 express 内置的 finalhandler 关闭链接
    return next(err)
  } else {
    res.send({
      message: message || msgMap[name] || msgMap.Default,
      code: codeMap[name] || codeMap.Default
    })
  }
}
