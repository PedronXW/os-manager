import { Either, left, right } from '@/@shared/either'
import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { InstallationNonExistsError } from '../../errors/installation-non-exists-error'
import { InstallationRepository } from '../../repositories/installation-repository'

type UpdateInstallationServiceRequest = {
  id: string
  name?: string
  description?: string
}

type UpdateInstallationServiceResponse = Either<
  InstallationNonExistsError,
  Installation
>

export class UpdateInstallationService {
  constructor(private installationRepository: InstallationRepository) {}

  async execute({
    id,
    name,
    description,
  }: UpdateInstallationServiceRequest): Promise<UpdateInstallationServiceResponse> {
    const installationExists =
      await this.installationRepository.getInstallationById(id)

    if (!installationExists) {
      return left(new InstallationNonExistsError())
    }

    installationExists.name = name ?? installationExists.name
    installationExists.description =
      description ?? installationExists.description

    return right(
      await this.installationRepository.updateInstallation(
        id,
        installationExists,
      ),
    )
  }
}
