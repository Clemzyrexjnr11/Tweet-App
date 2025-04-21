import { Sequelize } from "sequelize";
import sequelize from "../database.js";
 
const User = sequelize.define('user',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false,
    },
    email:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false,
    }
},{freezeTableName:true,timestamps:false});
User.sync({ alter: true })
.then(() => {
  console.log("user table created");
})
.catch((err) => {
  console.log(err.message);
});

//  module.exports = User;
export default User;