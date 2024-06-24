import { Either, right } from '@/@shared/either'
import { InstallationRepository } from '../../repositories/installation-repository'

type DeleteInstallationServiceRequest = {
  id: string
}

type DeleteInstallationServiceResponse = Either<void, void>

export class DeleteInstallationService {
  constructor(private installationRepository: InstallationRepository) {}

  async execute({
    id,
  }: DeleteInstallationServiceRequest): Promise<DeleteInstallationServiceResponse> {
    return right(await this.installationRepository.deleteInstallation(id))
  }
}
