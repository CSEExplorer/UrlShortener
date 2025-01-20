const { response } = require("express");
const user = require("../Model/user");

const {setUser} = require("../Services/auth");
const{v4:uuidv4} = require("uuid");

const handleUserSignup = async (req, res) => {
  const { first_name, email, pwd } = req.body;

  try {
    const newUser = new user({
      first_name,
      email,
      pwd,
    });

    // Save the new user to the database
    await newUser.save();

    return res.render("/");
  } catch (err) {
    console.error("Error creating the user", err.message);
    res.status(502).json({ error: "Cannot create the user" });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, pwd } = req.body;

  
  const User = await user.findOne({ email, pwd });

 
  if (!User) {
    return res.render("login", { error: "Invalid username or password" });
  } 
  //if everthing is correct 
//   const sessionId = uuidv4();

//   setUser(sessionId,User);
  const token = setUser(User);

  res.cookie("Jwttoken",token); 

 
  return res.redirect("/");
};


module.exports = { handleUserSignup ,handleUserLogin};
