import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
  InstallationQueryResponse,
  InstallationRepository,
} from '@/domain/application/repositories/installation-repository'
import { Installation } from '@/domain/enterprise/entities/installation/installation'

export class InMemoryInstallationRepository implements InstallationRepository {
  public installations: Installation[] = []

  async createInstallation(installation: Installation): Promise<Installation> {
    this.installations.push(installation)

    DomainEvents.markEntityForDispatch(installation)

    DomainEvents.dispatchEventsForEntity(installation.id)

    return installation
  }

  async updateInstallation(
    id: string,
    newInstallation: Installation,
  ): Promise<Installation> {
    const installationIndex = this.installations.findIndex(
      (installation) => installation.id.getValue() === id,
    )

    this.installations[installationIndex] = newInstallation

    return newInstallation
  }

  async deleteInstallation(id: string): Promise<void> {
    this.installations = this.installations.filter(
      (installation) => installation.id.getValue() !== id,
    )
  }

  async getAllInstallations(
    page: number,
    limit: number,
  ): Promise<InstallationQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      installations: this.installations.slice(startIndex, endIndex),
      installationsQueryCount: this.installations.length,
    }
  }

  async getInstallationById(id: string): Promise<Installation | undefined> {
    return this.installations.find(
      (installation) => installation.id.getValue() === id,
    )
  }
}
