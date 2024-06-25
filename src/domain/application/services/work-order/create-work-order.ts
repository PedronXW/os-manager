import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveClientError } from '../../errors/inactive-client-error'
import { InactiveInstallationError } from '../../errors/inactive-installation-error'
import { InstallationNonExistsError } from '../../errors/installation-non-exists-error'
import { InstallationRepository } from '../../repositories/installation-repository'
import { WorkOrderRepository } from '../../repositories/work-order-repository'

type CreateWorkOrderServiceRequest = {
  installation: string
  description: string
  creatorId: string
}

type CreateWorkOrderServiceResponse = Either<
  ClientNonExistsError | InactiveClientError,
  WorkOrder
>

export class CreateWorkOrderService {
  constructor(
    private workOrderRepository: WorkOrderRepository,
    private installationRepository: InstallationRepository,
  ) {}

  async execute({
    description,
    installation,
    creatorId,
  }: CreateWorkOrderServiceRequest): Promise<CreateWorkOrderServiceResponse> {
    const verifyInstallation =
      await this.installationRepository.getInstallationById(installation)

    if (!verifyInstallation) {
      return left(new InstallationNonExistsError())
    }

    if (!verifyInstallation.active) {
      return left(new InactiveInstallationError())
    }

    const workorder = WorkOrder.create({
      installation: verifyInstallation.id,
      description,
      createdBy: new EntityId(creatorId),
    })

    return right(await this.workOrderRepository.createWorkOrder(workorder))
  }
}
