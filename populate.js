import connectDb from './db/connect.js'
import dotenv from 'dotenv'
import Product from './models/product.model.js'
import jsonProduct from './products.json' assert { type: 'json' }

dotenv.config()

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URL)
    await Product.create(jsonProduct)
    console.log('success!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
