import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { UserRepository } from '../../repositories/user-repository'

type FindUserByEmailServiceRequest = {
  email: string
}

type FindUserByEmailServiceResponse = Either<UserNonExistsError, User>

export class FindUserByEmailService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: FindUserByEmailServiceRequest): Promise<FindUserByEmailServiceResponse> {
    const user = await this.userRepository.getUserByEmail(email)

    if (!user) {
      return left(new UserNonExistsError())
    }

    return right(user)
  }
}
