import { EntityId } from '@/@shared/entities/entity-id'
import { User } from '@/domain/enterprise/entities/user/user'

export function makeUser(override: Partial<User> = {}, id?: EntityId) {
  const user = User.create(
    {
      name: 'any_name',
      email: 'any_email',
      password: '12345678',
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return user
}
