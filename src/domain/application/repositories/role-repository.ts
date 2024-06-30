import { Role } from '@/domain/enterprise/entities/role/role'

export type RoleQueryResponse = {
  roles: Role[]
  rolesQueryCount: number
}

export abstract class RoleRepository {
  abstract createRole(role: Role): Promise<Role>
  abstract updateRole(id: string, newRole: Role): Promise<Role>
  abstract deleteRole(id: string): Promise<void>
  abstract getAllRoles(page: number, limit: number): Promise<RoleQueryResponse>

  abstract getRoleById(id: string): Promise<Role | undefined>
}
