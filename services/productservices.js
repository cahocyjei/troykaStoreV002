const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
//const getConnection = require('../libs/postgres');
const pool = require('../libs/postgres .pool')
class ProductServices{

  constructor(){
    this.pool = pool;
    this.pool.on('error',(err =>console.error(err)));
    this.products = [];
    this.generatedProducts();
  };

  generatedProducts(){
    for (let index = 0; index < 30; index++) {
      this.products.push(
        {
          id:faker.datatype.uuid(),
          name:faker.commerce.productName(),
          price:parseInt(faker.commerce.price(),10),
          image:faker.image.imageUrl(),
          isBlock:faker.datatype.boolean(),

        }
      )

    }
  };
//
  async getProducts(){
    //const client = await getConnection();
    const response = await pool.query('SELECT * FROM public.products');
    return response.rows;//this.products
  }
//
  async getProductById(id){
    const product = this.products.find(item=>item.id === id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is Block');
    }
    return product;
  }
//
  createProduct(data){
    const newProduct = {
      id: faker.datatype.uuid(),
        ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }
  updateProduct(id,change){
    const index = this.products.findIndex(item=>item.id === id);
    if (index === -1) {
      throw boom.notFound('Not found');
    }else{
      this.products[index] = {
      ...this.products[index],
      ...change
        }
      }
      return this.products[index];
    }
  deleteProduct(id){
    const index = this.products.findIndex(item=>item.id === id);
    if (index === -1) {
      throw boom.notFound('Not found');
    }else{
      this.products.splice(index,1);
      }
      return id;
  }
};
module.exports = ProductServices;
