import { Sequelize } from "sequelize";
import sequelize from "../database.js";

const adminUser = sequelize.define('admin',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    email:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false,
        unique:true
    },
    permission:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    password:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    }

});
adminUser.sync({alter:true}).then(()=>{console.log('admin table created')}).catch((err)=>{err.message});

// module.exports = adminUser;
export default adminUser