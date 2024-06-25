import { WorkOrderAvaliationNonExistsError } from './work-order-avaliation-non-exists-error'

describe('WorkOrderAvaliationNonExistsError', () => {
  it('should be able to create a new WorkOrderAvaliationNonExistsError', () => {
    const error = new WorkOrderAvaliationNonExistsError()

    expect(error.message).toBe('Work Order Avaliation non exists')
  })
})
