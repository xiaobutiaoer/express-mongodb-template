import { Request, Response, NextFunction } from 'express'

// 这是一个捕获异常的包裹层，用于减少内部的try catch
export default (callback: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}
