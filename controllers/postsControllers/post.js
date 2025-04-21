const Post = require("../../models/postsjs/Posts.js");
const { authenticateToken } = require("../authController/auth.js");
const { checkUsers } = require("../usersControllers/users.js");
const { checkAdminUsers } = require("../adminController/admin.js");


const createPost = async function (req, res) {
  let name = req.body["name"];
  let email = req.user.email;
  let post_content = req.body["userpost"];

  let users = await checkUsers();
  let currentUser = users.find((user) => user.email == email);
  if (currentUser) {
    let currentUserId = currentUser.id;
    try {
      Post.create({
        name: name,
        email: email,
        user_id: currentUserId,
        post_content: post_content,
      });
      res.json({ message: "post created successfully" });
    } catch (error) {
      res.json({ message: "something went wrong.." });
    }
  } else {
    res.json({ message: "No user found" });
  }
};

async function checkPost() {
  try {
    const result = await Post.findAll();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

const viewPosts = async function (req, res) {
  let adminUser = await checkAdminUsers();
  let users = await checkUsers();
  let admin = adminUser.find((user) => user.email == req.user.email);
  let user = users.find((user)=> user.email == req.user.email);
  let posts = await checkPost();
  if (admin) {
    res.json(posts);
  } else if(user){
    res.json(posts.filter((post) => post.email == req.user.email));
  }
  else {
   res.json({message:'not authorized'})
  }
};

const editPost = async function (req, res) {
  let postid = req.params.id;
  let users = await checkUsers();
  const posts = await checkPost();
  let name = req.body.name;
  let email = req.user.email;
  let userpost = req.body.userpost;
  let user = users.find((user) => user.email == email);
  let post = posts.find((post) => post.id == postid);

  if (post) {
    if (post.user_id == user.id) {
      const editPost = Post.update(
        {
          name: name,
          post_content: userpost,
        },
        { where: { id: postid } }
      );
      if (editPost) {
        res.json({ message: "Update successful" });
      } else {
        res.status(401).json({ message: "Somethig went wrong" });
      }
    } else {
      res.json({ message: "you are unauthorised to perform this action" });
    }
  } else {
    res.json({ message: "Post does not exist" });
  }
};

const deletePost = async function (req, res) {
  let postid = req.params.id;
  let users = await checkUsers();
  let adminUser = await checkAdminUsers();
  const posts = await checkPost();
  let email = req.user.email;
  let user = users.find((user) => user.email == email);
  let user_admin = adminUser.find(
    (user) =>
      user.email == req.user.email && user.permission == "delete_post"
  );
  let post = posts.find((post) => post.id == postid);
  if (post) {
    if (user_admin || post.user_id == user.id) {
      const deletePost = Post.destroy({ where: { id: postid } });
      if (deletePost) {
        res.json({ message: "delete successful" });
      } else {
        res.status(401).json({ message: "Somethig went wrong" });
      }
    } else {
      res.json({ message: "you are unauthorised to perform this action" });
    }
  } else {
    res.json({ message: "Post does not exist" });
  }
};

module.exports = { checkPost, createPost, viewPosts, editPost,deletePost };
