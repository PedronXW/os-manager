import { ProductNonExistsError } from './product-non-exists-error'

describe('ProductNonExistError', () => {
  it('should be able to create a new ProductNonExistsError', () => {
    const error = new ProductNonExistsError()

    expect(error.message).toBe('Product non exists error')
  })
})
