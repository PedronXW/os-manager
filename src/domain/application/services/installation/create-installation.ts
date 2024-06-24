import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveClientError } from '../../errors/inactive-client-error'
import { ClientRepository } from '../../repositories/client-repository'
import { InstallationRepository } from '../../repositories/installation-repository'

type CreateInstallationServiceRequest = {
  name: string
  description: string
  client: string
  creatorId: string
}

type CreateInstallationServiceResponse = Either<
  ClientNonExistsError | InactiveClientError,
  Installation
>

export class CreateInstallationService {
  constructor(
    private installationRepository: InstallationRepository,
    private clientRepository: ClientRepository,
  ) {}

  async execute({
    name,
    description,
    client,
    creatorId,
  }: CreateInstallationServiceRequest): Promise<CreateInstallationServiceResponse> {
    const verifyClient = await this.clientRepository.getClientById(client)

    if (!verifyClient) {
      return left(new ClientNonExistsError())
    }

    if (!verifyClient.active) {
      return left(new InactiveClientError())
    }

    const installation = Installation.create({
      name,
      description,
      client: new EntityId(client),
      createdBy: new EntityId(creatorId),
    })

    return right(
      await this.installationRepository.createInstallation(installation),
    )
  }
}
