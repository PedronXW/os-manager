import { Either, left, right } from '@/@shared/either'
import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { InstallationNonExistsError } from '../../errors/installation-non-exists-error'
import { InstallationRepository } from '../../repositories/installation-repository'

type GetInstallationByIdServiceRequest = {
  id: string
}

type GetInstallationByIdServiceResponse = Either<
  InstallationNonExistsError,
  Installation | undefined
>

export class GetInstallationByIdService {
  constructor(private installationRepository: InstallationRepository) {}

  async execute({
    id,
  }: GetInstallationByIdServiceRequest): Promise<GetInstallationByIdServiceResponse> {
    const installation =
      await this.installationRepository.getInstallationById(id)

    if (!installation) {
      return left(new InstallationNonExistsError())
    }

    return right(installation)
  }
}
