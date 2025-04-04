const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DB_USER
});

sequelize.authenticate().then(()=>{
   console.log('connection successful')
}).catch((err)=>{
    console.log('connection error')
})
 
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

 module.exports = Post;