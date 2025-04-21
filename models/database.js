
import Sequelize from "sequelize"
// import  env from "dotenv";

const sequelize = new Sequelize(process.env.DB_DATABASE,"postgres","Clemzyrexjn#9",{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:"postgres",

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

export default sequelize;