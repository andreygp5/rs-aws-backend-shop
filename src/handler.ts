import { Handler } from 'aws-lambda'

export const hello: Handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify('Hello ts serverless')
  }
}
