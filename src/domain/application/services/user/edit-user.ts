import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { UserRepository } from '../../repositories/user-repository'

type EditUserServiceResponse = Either<UserNonExistsError, User>

export class EditUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, name: string): Promise<EditUserServiceResponse> {
    const user = await this.userRepository.getUserById(id)

    if (!user) {
      return left(new UserNonExistsError())
    }

    user.name = name

    const updatedUser = await this.userRepository.editUser(id, user)

    return right(updatedUser)
  }
}
