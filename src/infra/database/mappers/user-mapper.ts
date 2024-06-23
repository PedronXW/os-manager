import { EntityId } from '@/@shared/entities/entity-id'
import { User } from '@/domain/enterprise/entities/user/user'

export class UserMapper {
  static toDomain(raw): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        active: raw.active,
        deletedAt: raw.deletedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new EntityId(raw.id),
    )
  }

  static toPersistence(user: User) {
    return {
      id: user.id.getValue(),
      name: user.name,
      email: user.email,
      active: user.active,
      password: user.password,
      deletedAt: user.deletedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
