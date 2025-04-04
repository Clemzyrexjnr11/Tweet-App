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

module.exports = adminUser;