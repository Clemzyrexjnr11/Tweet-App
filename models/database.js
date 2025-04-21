const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DB_USER,

    define:{
        freezeTableName:true,
        timestamps:false
    }
});

sequelize.authenticate().then(()=>{
    console.log('connection successful')
 }).catch((err)=>{
     console.log('connection error')
 })

module.exports = sequelize;