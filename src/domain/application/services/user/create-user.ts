import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user'
import { HashGenerator } from '../../criptography/hash-generator'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { UserRepository } from '../../repositories/user-repository'

interface CreateUserServiceRequest {
  name: string
  email: string
  password: string
}

type CreateUserServiceResponse = Either<UserAlreadyExistsError, User>

export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userExists = await this.userRepository.getUserByEmail(email)

    if (userExists) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    const newUser = await this.userRepository.createUser(user)

    return right(newUser)
  }
}
