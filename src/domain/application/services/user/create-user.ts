import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user/user'
import { HashGenerator } from '../../criptography/hash-generator'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'

interface CreateUserServiceRequest {
  name: string
  email: string
  password: string
}

type CreateUserServiceResponse = Either<
  | UserAlreadyExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  User
>

export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.USER_CREATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

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
