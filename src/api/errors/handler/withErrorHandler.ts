import typia from 'typia'
import { z } from 'zod'

import { RouteHandler } from '../../routes/types'

// TODO: log the user who created the errors
export const withErrorHandler: (handler: RouteHandler) => RouteHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      if (err instanceof z.ZodError) {
        next({
          message: err.issues,
        })
      }
      if (err instanceof typia.TypeGuardError) {
        next({
          message: err.message,
          error: err,
        })
      }
      next(err)
    }
  }
}
