import { Handler } from 'aws-lambda'
import { ProductHandler } from './product.handler'
import { ProductService } from './product.service'

const productsHandler = new ProductHandler(new ProductService())

export const getProductsList: Handler = async (event, context) => productsHandler.getAll(event, context)

export const getProductsById: Handler = async (event, context) => productsHandler.getOne(event, context)
