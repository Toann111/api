/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { APIs_V2 } from './routes/v2'
import { boardController } from './controllers/boardController'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.use('/v1', APIs_V1)
  app.use('/v2', APIs_V2)
  app.get('/', async (req, res) => {
    try {
        const result = await boardController.getProduct
        res.json(result)
        console.log('data', result); // eslint-disable-line no-console
    } catch (error) {
        res.status(500).send('Error fetching the board collection')
    }
});
  // middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hi ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas')
  })
}

(async () => {
  try {
    console.log('1. Connecting MongoDB Cloud Atlas...!')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas !')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
