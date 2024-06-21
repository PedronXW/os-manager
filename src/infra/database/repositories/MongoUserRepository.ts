import { UserRepository } from '@/domain/application/repositories/user-repository'
import { User } from '@/domain/enterprise/entities/user'
import { env } from '@/infra/env'
import { UserMapper } from '../mappers/user-mapper'
import { MongoConnection } from '../mongo-connection'

export class MongoUserRepository implements UserRepository {
  constructor(private mongoConnection: MongoConnection) {}

  async createUser(user: User): Promise<User> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    await collection.insertOne(UserMapper.toPersistence(user))

    return user
  }

  async changeUserPassword(id: string, password: string): Promise<User> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    await collection.updateOne(
      { id },
      {
        $set: {
          password,
        },
      },
    )

    const user = await collection.findOne({ id })

    return UserMapper.toDomain(user)
  }

  async deleteUser(id: string): Promise<boolean> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    const deleteResult = await collection.updateOne(
      { id },
      {
        $set: {
          active: false,
          deletedAt: new Date(),
        },
      },
    )
    return deleteResult.modifiedCount > 0
  }

  async editUser(id: string, newUser: User): Promise<User> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    const updatedUser = collection.updateOne(
      { id },
      {
        $set: UserMapper.toPersistence(newUser),
      },
    )

    return UserMapper.toDomain(updatedUser)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    const user = await collection.findOne({ email })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async getUserById(id: string): Promise<User | null> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    const user = await collection.findOne({ id })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async getAllUsers(): Promise<User[]> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    const users = await collection.find().toArray()

    return users.map((user) => UserMapper.toDomain(user))
  }

  async changeStatus(id: string, status: 'online' | 'offline'): Promise<User> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID + '_users'
        : 'users',
    )

    await collection.updateOne(
      { id },
      {
        $set: {
          status,
        },
      },
    )

    const user = await collection.findOne({ id })

    return UserMapper.toDomain(user)
  }
}
