import { User } from '@/domain/enterprise/entities/user/user'
import { Crypto } from '@/infra/cryptography/crypto'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateUserService } from './create-user'

let sut: CreateUserService
let inMemoryUserRepository: InMemoryUserRepository
let crypto: Crypto
let authorizationService: AuthorizationService
let userRepository: UserRepository

describe('CreateUser', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    crypto = new Crypto()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.USER_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateUserService(
      inMemoryUserRepository,
      crypto,
      authorizationService,
    )
  })

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users[0].name).toEqual('any_name')
  })

  it('should not be able to create a user with the same email', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'anyemail@email.com',
      password: 'any_password',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({
      name: 'any_name',
      email: 'anyemail@email.com',
      password: 'any_password',
    })

    expect(inMemoryUserRepository.users).toHaveLength(1)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
