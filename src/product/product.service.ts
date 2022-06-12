import { Product } from './product.model'
import { PRODUCTS_MOCK } from '../data/mock'

export class ProductService {
  private readonly productsMock = PRODUCTS_MOCK

  async getAll (): Promise<Product[]> {
    return this.productsMock
  }

  async getOne (id: Product['id']): Promise<Product> {
    return this.productsMock.find(product => product.id === id)
  }
}
