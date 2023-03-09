const express = require('express');
const app=express();
const router = require('./src/routes');
require('dotenv').config();

app.use(express.json());
app.use('/',router);


const port= process.env.PORT || 4000;

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});