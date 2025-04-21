const User = require("../../models/Users_js/Users.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { checkAdminUsers } = require("../adminController/admin.js");


async function checkUsers() {
try{
  const users = await User.findAll()
  return users
}catch(error){
  console.log({ message: "error finding user" })
}

}

const saltRounds = 10;

const registerUser = function (req, res) {
  let { name, email, password } = req.body;
  let hashedPassword;
  bcryptjs.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err.message);
    } else {
      hashedPassword = hash;
      const user = User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      if (user) {
        res.json({ message: "user created successfully" });
      } else {
        res.json({ message: "not added" });
      }
    }
  });
};

const loginUsers = async function (req, res){
  let email = req.body.email;
  let password = req.body.password;
  const users = await checkUsers();
  const adminUser = await checkAdminUsers();
  let loginUser = users.find((user)=> user.email == email);
  let loginAdmin = adminUser.find((user)=> user.email == email);

  if (loginUser) {
    bcryptjs.compare(loginUser.password, password, (err, result) => {
      if (err) {
        console.log("Incorrect password");
      } else {
        const user = { email: loginUser.email, userid: loginUser.id };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN,
          {
            expiresIn: '10m',
          }
        );
        
        // const refreshToken = generateRefreshToken(user);
        res.json({
          accessToken: accessToken,
          email: user.email,
        });
      }
    });
  } else if (loginAdmin) {
    bcryptjs.compare(loginAdmin.password, password, (err, result) => {
      if (err) {
        console.log("Incorrect password");
      } else {
        const user = { email: email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);

        res.json({
          accessToken: accessToken,
          email: user.email,
        });
      }
    });
  } else {
    res.json("no user found");
  }
};

module.exports = { registerUser, checkUsers, loginUsers };
