import { verify } from 'jsonwebtoken'

import { InactiveUserError } from '@/domain/application/errors/InactiveUserError'
import { RedisCacheRepository } from '@/infra/cache/redis-repository'
import { env } from '@/infra/env'
import { AppError } from '../errors/AppError'

interface IPayload {
  id: string
}

export async function verifyAuthentication(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { id } = verify(token, env.JWT_SECRET) as IPayload

    const cacheRepository = new RedisCacheRepository()
    const isUserDeleted = await cacheRepository.get(`user:${id}`)

    if (isUserDeleted) {
      throw new InactiveUserError()
    }

    request.user = {
      id,
    }

    next()
  } catch (error) {
    if (error instanceof InactiveUserError) {
      throw new AppError('User is inactive', 401)
    }

    throw new AppError('Invalid token', 401)
  }
}
