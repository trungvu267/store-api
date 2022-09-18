import { Router } from 'express'
import {
  getAllProducts,
  getAllStaticProducts,
} from '../controllers/product.controller.js'
const router = Router()

router.get('/static', getAllStaticProducts)
router.get('/', getAllProducts)
// router.get('/:id', getTask)
// router.patch('/:id', updateTask)
// router.delete('/:id', deleteTask)

export default router
