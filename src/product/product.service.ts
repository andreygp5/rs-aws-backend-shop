import { Product } from './model/product.model'
import { Client, Pool } from 'pg'
import { CreateProductDto } from './model/create-dto'
import { validateOrReject } from 'class-validator'

export class ProductService {
  async getAll (): Promise<Product[]> {
    const client = new Client()
    await client.connect()
    const res = await client.query<Product>(`
        select id, title, description, price, count, array_agg(url) images
        from products
                 join stock on stock.product_id = id
                 join media on media.product_id = id
        group by id,
                 count
    `)
    await client.end()
    return res.rows
  }

  async getOne (id: Product['id']): Promise<Product | null> {
    const client = new Client()
    await client.connect()

    try {
      const res = await client.query<Product>(`
          select id, title, description, price, count, array_agg(url) images
          from products
                   join stock on stock.product_id = id
                   join media on media.product_id = id
          where id = $1
          group by id,
                   count
      `, [id])

      return res.rows[0]
    } catch (err) {
      return null
    } finally {
      await client.end()
    }
  }

  async createProduct (productDto: CreateProductDto): Promise<Product | null> {
    try {
      const newProductObj = new CreateProductDto()
      newProductObj.title = productDto.title
      newProductObj.description = productDto.description
      newProductObj.price = productDto.price
      newProductObj.count = productDto.count
      newProductObj.images = productDto.images

      await validateOrReject(newProductObj)
    } catch (e) {
      throw { statusCode: 400, body: JSON.stringify(e) }
    }

    const pool = new Pool()
    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      const createProductRes = await client.query<Product>(`
        insert into products (title, description, price)
                    values ($1, $2, $3)
                    returning id
    `, [productDto.title, productDto.description, productDto.price])

      const newProductId = createProductRes.rows[0].id

      await client.query(`
        insert into stock (count, product_id)
                    values ($1,  $2)
    `, [productDto.count, newProductId])

      await productDto.images.forEach(async (image) => {
        await client.query(`
        insert into media (url, product_id)
                    values ($1,  $2)
    `, [image, newProductId])
      })

      await client.query('COMMIT')

      return this.getOne(newProductId)
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}
