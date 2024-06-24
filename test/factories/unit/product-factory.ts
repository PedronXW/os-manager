import { EntityId } from '@/@shared/entities/entity-id'
import { Product } from '@/domain/enterprise/entities/product/product'

export function makeProduct(override: Partial<Product> = {}, id?: EntityId) {
  const product = Product.create(
    {
      name: 'any_name',
      code: 'a',
      fabricator: 'a',
      price: 12,
      description: 'a',
      createdBy: new EntityId('a'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return product
}
