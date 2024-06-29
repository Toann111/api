
import express from 'express'
import { boardRoute } from './boardRoute'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.get('/', (boardController.getProduct))
Router.use('/boards', boardRoute)

export const APIs_V1 = Router