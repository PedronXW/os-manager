import { WorkOrderNonExistsError } from './work-order-non-exists-error'

describe('WorkOrderNonExistsError', () => {
  it('should be able to create a new WorkOrderNonExistsError', () => {
    const error = new WorkOrderNonExistsError()

    expect(error.message).toBe('Work Order non exists')
  })
})
