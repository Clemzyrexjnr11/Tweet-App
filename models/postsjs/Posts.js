import { Sequelize } from "sequelize";
import sequelize from "../database.js";

 
const Post = sequelize.define('post',{
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
    },
    post_content:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false,
    },
    user_id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
    }
},{freezeTableName:true,timestamps:false});

Post.sync({alter:true}).then(()=>{console.log('post table created')}).catch((err)=>{console.log(err.message)});

//  module.exports = Post;
export default Post;