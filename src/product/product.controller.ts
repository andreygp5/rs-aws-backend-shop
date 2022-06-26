import { ProductService } from './product.service'
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda'
import { InternalServerError } from '../utils/response'

export class ProductController {
  private readonly productsService: ProductService

  constructor (productsService: ProductService) {
    this.productsService = productsService
  }

  async getAll (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      console.log('Get all products')
      const products = await this.productsService.getAll()

      return {
        statusCode: 200,
        body: JSON.stringify(products)
      }
    } catch (e) {
      return InternalServerError
    }
  }

  async getOne (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      const productId = event.pathParameters.productId
      console.log(`Get product with id=${productId}`)
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
    } catch (e) {
      return InternalServerError
    }
  }

  async createProduct (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      console.log(`Create product - ${event.body}`)
      const newProduct = await this.productsService.createProduct(JSON.parse(event.body))

      return {
        statusCode: 200,
        body: JSON.stringify(newProduct)
      }
    } catch (e) {
      if (e.statusCode) {
        return e
      } else {
        return InternalServerError
      }
    }
  }
}
