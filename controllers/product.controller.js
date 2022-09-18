import Product from '../models/product.model.js'
const getAllStaticProducts = async (req, res) => {
  const products = await Product.find().select('name price').skip(1).limit(1)
  res.status(200).json({ products, num: products.length })
}
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query
  const objQuery = {}
  if (featured) {
    objQuery.featured = featured === 'true' ? true : false
  }
  if (company) {
    objQuery.company = company
  }
  if (name) {
    objQuery.name = { $regex: name, $options: 'i' }
  }
  let result = Product.find(objQuery)
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = Product.find(objQuery).sort(sortList)
  }
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = Product.find(objQuery).select(fieldsList)
  }
  const page = Number(req.body.query) || 1
  const limit = Number(req.body.limit) || 10
  const skip = (page - 1) * limit

  const products = await result.skip(skip).limit(limit)
  res.status(200).json({ products, num: products.length })
}

export { getAllProducts, getAllStaticProducts }
