import { RouteHandler } from '../../routes/types'

export const withErrorHandler: (handler: RouteHandler) => RouteHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
