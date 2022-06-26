import { Product } from './product.model'
import { Client } from 'pg'

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
}
