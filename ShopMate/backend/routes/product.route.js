const express=require('express')
const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const router=express.Router()
const isAuth=require('../middlewares/authMiddleware')

router.post('/create',isAuth,createProduct)
router.get('/getAll',getAllProduct)
router.get('/getProduct/:id',getProductById)
router.put('/update/:id', isAuth,updateProduct)
router.delete('/delete/:id', isAuth,deleteProduct)

module.exports=router