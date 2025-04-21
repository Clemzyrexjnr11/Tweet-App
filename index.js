import  express from "express";
import  env from "dotenv";
import  bodyParser from "body-parser";
import router from './routes/routes.js'

// const crypto = require ("crypto");
// const pg = require ("pg");
//  const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");




const app = express();
const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
env.config();


app.use('/',router)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});



