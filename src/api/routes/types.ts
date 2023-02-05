import { PayloadRequest } from 'payload/types'

import { NextFunction, Response } from 'express'

export type RouteHandler = (req: PayloadRequest, res: Response, next: NextFunction) => Promise<void>
