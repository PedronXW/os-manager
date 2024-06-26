import { User } from '@/domain/enterprise/entities/user/user';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>
  abstract changeUserPassword(id: string, password: string): Promise<User>
  abstract deleteUser(id: string): Promise<boolean>
  abstract editUser(id: string, newUser: User): Promise<User>
  abstract getUserByEmail(email: string): Promise<User | null>
  abstract getUserById(id: string): Promise<User | null>
}
