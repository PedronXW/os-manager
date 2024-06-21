import { Either, left, right } from '@/@shared/either'
import { env } from '@/infra/env'
import { Encrypter } from '../../criptography/encrypter'
import { HashGenerator } from '../../criptography/hash-generator'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { UserRepository } from '../../repositories/user-repository'

type ResetUserPasswordServiceRequest = {
  id: string
  password: string
}

type ResetUserPasswordServiceResponse = Either<UserNonExistsError, null>

export class ResetUserPasswordService {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
    private encrypter: Encrypter,
  ) {}

  async execute({
    id,
    password,
  }: ResetUserPasswordServiceRequest): Promise<ResetUserPasswordServiceResponse> {
    const { id: translatedId } = await this.encrypter.decrypt(
      id,
      env.RESET_PASSWORD_SECRET,
    )

    const userExists = await this.userRepository.getUserById(translatedId)

    if (!userExists) {
      return left(new UserNonExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    await this.userRepository.changeUserPassword(translatedId, hashedPassword)

    return right(null)
  }
}
