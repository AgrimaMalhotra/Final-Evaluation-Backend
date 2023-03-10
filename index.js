const express = require('express');
const app=express();
const router = require('./src/routes');
require('dotenv').config();
const cors = require('cors');
const corsOrigins = [
  'http://localhost:3000',
];

app.use(cors({
  origin: corsOrigins,
}));
app.use(express.json());
app.use('/',router);

const port= process.env.PORT || 4000;

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});