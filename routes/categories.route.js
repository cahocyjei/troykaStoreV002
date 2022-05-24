const express = require('express');
const router = express.Router();
const {faker}  = require('@faker-js/faker');

router.get('/',(req,res)=>{
  const categories = [];
  for (let index = 0; index < 10; index++) {
    categories.push(
      {
        id:index,
        name:faker.commerce.product()
      }
    )
  }
  res.json(categories);
});

router.get('/:categoryId',(req,res)=>{
  const { categoryId } = req.params;
  res.json({
    categoryId,
    productId:5,
    name:faker.name.findName()
  })
})
module.exports = router;
