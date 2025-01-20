// services/auth.js

const jwt = require("jsonwebtoken");
const secret = "$donadi1234$";

const setUser = (user) =>{
  //here payload is user 
  return jwt.sign({
    _id:user._id,
    email:user.email
  }, secret);
}

const getUser = (token) => {
    if(!token)return null;
    try{
       return jwt.verify(token,secret);
    }
    catch(error){
         return null;
    }
  


}


module.exports = {
  setUser,
  getUser
  
};

//  This thing is not required since i am using JWT
// const SessionIdTouserMap = new Map(); // A hashmap to store UID and corresponding user data

// const setUser = (uid, user) => {
//   if (SessionIdTouserMap.has(uid)) {
//     throw new Error("User already exists with this UID");
//   }
//   SessionIdTouserMap.set(uid, user);
// };

// const getUser = (uid) => {
//   return SessionIdTouserMap.get(uid) || null;
// };
