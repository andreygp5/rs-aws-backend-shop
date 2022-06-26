import { APIGatewayProxyResult } from 'aws-lambda'

export const InternalServerError: APIGatewayProxyResult = {
  statusCode: 500,
  body: 'Internal server error'
}
