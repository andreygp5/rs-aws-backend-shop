import { ProductController } from '../product.controller'
import { ProductService } from '../product.service'
import { Product } from '../product.model'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

const productsMock: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    description: 'Description 1',
    price: 100,
    count: 20,
    images: ['https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80']
  },
  {
    id: '2',
    title: 'Product 2',
    description: 'Description 2',
    price: 100,
    count: 20,
    images: ['https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80']
  }
]

class MockProductService extends ProductService {
  async getAll (): Promise<Product[]> {
    return productsMock
  }

  async getOne (id: Product['id']): Promise<Product | null> {
    return productsMock.find(product => product.id === id)
  }
}

describe('Handler', () => {
  let productController: ProductController

  beforeEach(() => {
    productController = new ProductController(new MockProductService())
  })

  it('should return all products with 200 code (getAll)', async () => {
    const resp: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(productsMock)
    }

    const controllerResp = await productController.getAll({} as unknown as APIGatewayEvent, {} as unknown as Context)

    expect(controllerResp).toEqual(resp)
  })

  it('should return product by specified id (getOne)', async () => {
    const productId = '1'
    const product = productsMock.find(product => product.id === productId)

    const resp: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(product)
    }

    const controllerResp = await productController.getOne({ pathParameters: { productId } } as unknown as APIGatewayEvent, {} as unknown as Context)

    expect(controllerResp).toEqual(resp)
  })

  it('should return 404 for not existing product (getOne)', async () => {
    const controllerResp = await productController.getOne({ pathParameters: { productId: '100' } } as unknown as APIGatewayEvent, {} as unknown as Context)

    expect(controllerResp.statusCode).toBe(404)
  })
})
