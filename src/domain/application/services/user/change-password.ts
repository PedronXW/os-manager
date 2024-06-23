import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user/user'
import { HashComparer } from '../../criptography/hash-comparer'
import { HashGenerator } from '../../criptography/hash-generator'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WrongCredentialError } from '../../errors/wrong-credentials-error'
import { UserRepository } from '../../repositories/user-repository'

type ChangePasswordServiceResponse = Either<UserNonExistsError, User>

export class ChangePasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private hashComparer: HashComparer,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(
    id: string,
    password: string,
    newPassword: string,
  ): Promise<ChangePasswordServiceResponse> {
    const user = await this.userRepository.getUserById(id)

    if (!user) {
      return left(new UserNonExistsError())
    }

    const passwordMatch = await this.hashComparer.compare(
      password,
      user.password!,
    )

    if (!passwordMatch) {
      return left(new WrongCredentialError())
    }

    const editResult = await this.userRepository.changeUserPassword(
      id,
      await this.hashGenerator.hash(newPassword),
    )

    return right(editResult)
  }
}
