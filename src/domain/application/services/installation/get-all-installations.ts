import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
    InstallationQueryResponse,
    InstallationRepository,
} from '../../repositories/installation-repository'

type GetAllInstallationsServiceRequest = {
  page: number
  limit: number
}

type GetAllInstallationsServiceResponse = Either<
  PaginationError,
  InstallationQueryResponse
>

export class GetAllInstallationsService {
  constructor(private installationRepository: InstallationRepository) {}

  async execute({
    page,
    limit,
  }: GetAllInstallationsServiceRequest): Promise<GetAllInstallationsServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.installationRepository.getAllInstallations(page, limit),
    )
  }
}
