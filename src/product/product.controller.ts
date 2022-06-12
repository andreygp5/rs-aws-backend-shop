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

  async getOne (event: APIGatewayEvent, context: Context) {
    const productId = event.pathParameters.productId
    const product = await this.productsService.getOne(productId)

    return {
      statusCode: 200,
      body: JSON.stringify(product)
    }
  }
}
