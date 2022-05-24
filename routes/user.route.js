const express = require('express');
const router = express.Router();
const {faker}  = require('@faker-js/faker');

router.get('/all',(req,res)=>{
  const users= [];
  for (let index = 0; index < 20; index++) {
    users.push(
      {
        id:index,
        name:faker.name.findName(),
        address:faker.address.streetAddress(),
        phone:faker.phone.phoneNumber()
      }
      )
  };
  res.json(users);
});

router.get('/',(req,res)=>{
  const { limit,offset,size} = req.query;
  if (limit && offset) {
    res.json({
    limit,
    offset,
    size
  })
  }else{
    res.send('No hay parametros');
  }

})
module.exports = router;
