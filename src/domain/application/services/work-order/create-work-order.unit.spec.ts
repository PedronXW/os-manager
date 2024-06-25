import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { makeInstallation } from 'test/factories/unit/installation-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { CreateWorkOrderService } from './create-work-order'

describe('CreateWorkOrder', () => {
  let sut: CreateWorkOrderService
  let workOrderRepository: InMemoryWorkOrderRepository
  let installationRepository: InMemoryInstallationRepository

  beforeEach(() => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    installationRepository = new InMemoryInstallationRepository()
    sut = new CreateWorkOrderService(
      workOrderRepository,
      installationRepository,
    )
  })

  it('should be able to create a work order', async () => {
    const installation = makeInstallation()

    installationRepository.createInstallation(installation)

    const response = await sut.execute({
      installation: installation.id.getValue(),
      description: 'arroz',
      creatorId: 'creatorId',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrder))
    expect(workOrderRepository.workOrders).toHaveLength(1)
  })
})
