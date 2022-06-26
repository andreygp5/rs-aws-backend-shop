import { APIGatewayEvent, Context } from 'aws-lambda'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import middy from '@middy/core'
import cors from '@middy/http-cors'

const productController = new ProductController(new ProductService())

export const getProductsList = middy((event: APIGatewayEvent, context: Context) => productController.getAll(event, context)).use(cors())

export const getProductsById = middy((event: APIGatewayEvent, context: Context) => productController.getOne(event, context)).use(cors())

export const createProduct = middy((event: APIGatewayEvent, context: Context) => productController.createProduct(event, context)).use(cors())
