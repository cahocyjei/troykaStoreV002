const express = require('express');
const ProductsRoute = require('./product.router');
const CategoriesRoute = require('./categories.route');
const UserRoute = require('./user.route');

function RouterApi(app){
  const router = express.Router();
  app.use('/api/V1',router);
  router.use('/products',ProductsRoute);
  router.use('/categories',CategoriesRoute);
  router.use('/users',UserRoute);
};

module.exports = RouterApi;
