import { WorkOrderResultNonExistsError } from './work-order-result-non-exists-error'

describe('WorkOrderResultNonExistsError', () => {
  it('should be able to create a new WorkOrderResultNonExistsError', () => {
    const error = new WorkOrderResultNonExistsError()

    expect(error.message).toBe('Work Order Result non exists')
  })
})
