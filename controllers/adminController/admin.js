import adminUser  from "../../models/adminjs/admin.js";
import bcryptjs from  "bcryptjs";


const saltRounds = 10;

 export const registerAdmin = function (req,res){
    let {name,email,permission,password} = req.body;
    let hashedPassword;

    bcryptjs.hash(password,saltRounds,(err, hash)=>{
        if(err){
            res.json({message:err.message})
        }else{
            hashedPassword = hash;
            const user =  adminUser.create({
                name:name,
                email:email,
                permission:permission,
                password:hashedPassword
            })
            if(user){
                res.json({message:"admin created successfully"})
            }else{
                res.json({message:"error occured while creating admin"})
                 
            }
        }
    })
}

 export async function checkAdminUsers() {
    try{
        const admin_user = await adminUser.findAll()
            return admin_user;
    }catch(error){
        console.log({message:"error finding admin user"})
    }
}
