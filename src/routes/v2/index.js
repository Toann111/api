
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute'

const Router = express.Router()

Router.get('/status', ( req, res ) => {
  res.status(StatusCodes.OK).json({ massage: 'APIs V2 are ready to use.' })
})
Router.use('/users', userRoute)

export const APIs_V2 = Router