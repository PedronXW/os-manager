import { Router } from 'express'
import { authenticationRoutes } from './authentication'
import { usersRouter } from './users'

const router = Router()

router.use('/sessions', authenticationRoutes)

router.use('/users', usersRouter)

export { router }
