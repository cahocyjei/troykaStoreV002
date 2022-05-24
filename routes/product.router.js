const express = require('express');
const router = express.Router();
const ProductServices = require('../services/productservices');
const validatorHandler = require('./../midlewares/validator.data');
const {createSchemaProduct,updateSchemaProduct,getProductSchema} = require('./../schemas/schema.products');
//
const service = new ProductServices();
//
router.get('/',async (req,res)=>{
  const products = await service.getProducts();
  res.status(200).json(products);
});
//
router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const { id } = req.params;
      const product = await service.getProductById(id);
      res.json(product)
      } catch (error) {
      next(error);
    }
});
//
router.post('/',
  validatorHandler(createSchemaProduct,'body'),
  (req,res)=>{
    const body = req.body;
    const newProduct = service.createProduct(body);
    res.status(201).json(newProduct);
});
  //
router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateSchemaProduct,'body'),
  async (req,res,next)=>{
    try {
      const {id } = req.params;
      const body = req.body;
      const product = await service.updateProduct(id,body);
      res.json(product);
    } catch (error) {
      next(error);
    }

});
  //
router.delete('/:id',(req,res,next)=>{
  try {
    const {id } = req.params;
    const rta = service.deleteProduct(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }

})

module.exports = router;
