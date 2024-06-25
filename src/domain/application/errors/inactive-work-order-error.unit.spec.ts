import { InactiveWorkOrderError } from './inactive-work-order-error'

describe('InactiveWorkOrderError', () => {
  it('should be able to create a new InactiveWorkOrderError', () => {
    const error = new InactiveWorkOrderError()

    expect(error.message).toBe('Work order is inactive')
  })
})
