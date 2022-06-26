import { ProductService } from './product.service'
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda'

export class ProductController {
  private readonly productsService: ProductService

  constructor (productsService: ProductService) {
    this.productsService = productsService
  }

  async getAll (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    const products = await this.productsService.getAll()

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  }

  async getOne (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    const productId = event.pathParameters.productId
    const product = await this.productsService.getOne(productId)
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: `Product with id=${productId} was not found` })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product)
    }
  }

  async createProduct (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      const newProduct = await this.productsService.createProduct(JSON.parse(event.body))

      return {
        statusCode: 200,
        body: JSON.stringify(newProduct)
      }
    } catch (e) {
      if (e.statusCode) {
        return e
      } else {
        return {
          statusCode: 500,
          body: 'Internal server error'
        }
      }
    }
  }
}
