import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
    RoleQueryResponse,
    RoleRepository,
} from '@/domain/application/repositories/role-repository'
import { Role } from '@/domain/enterprise/entities/role/role'

export class InMemoryRoleRepository implements RoleRepository {
  public roles: Role[] = []

  async createRole(role: Role): Promise<Role> {
    this.roles.push(role)

    DomainEvents.markEntityForDispatch(role)

    DomainEvents.dispatchEventsForEntity(role.id)

    return role
  }

  async updateRole(id: string, newRole: Role): Promise<Role> {
    const roleIndex = this.roles.findIndex((role) => role.id.getValue() === id)

    this.roles[roleIndex] = newRole

    return newRole
  }

  async deleteRole(id: string): Promise<void> {
    this.roles = this.roles.filter((role) => role.id.getValue() !== id)
  }

  async getAllRoles(page: number, limit: number): Promise<RoleQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      roles: this.roles.slice(startIndex, endIndex),
      rolesQueryCount: this.roles.length,
    }
  }

  async getRoleById(id: string): Promise<Role | undefined> {
    return this.roles.find((role) => role.id.getValue() === id)
  }
}
