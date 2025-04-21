const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
// const crypto = require ("crypto");
// const pg = require ("pg");
//  const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");




const app = express();
const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
env.config();


const router = require("./routes/routes.js") ;
app.use('/',router)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});



