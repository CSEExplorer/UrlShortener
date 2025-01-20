const { getUser } = require("../Services/auth");




const checkForAuthentication = (req,res,next)=>{
    // const authorizationHeaderValue = req.headers["authorization"];
        const authorizationCookieValue = req.cookies?.Jwttoken;

    if(!authorizationCookieValue){
       return next();

    }
    // const token = authorizationHeaderValue.split("Bearer ")[1];
    const token = authorizationCookieValue;
    const user = getUser(token);
    req.user = user;
    next();
}

const  restrictTo = (roles)=>{
    return function(req,res,next){
        if(!req.user)return res.redirect("/login");

        if(!roles.include(req.user.roles))return res.end("UnAuthorized");

        return next();
    }

    
}
module.exports = {checkForAuthentication,restrictTo}




// previous code 


// const restrictTologgedInUserOnly = async (req, res, next) => {
//   const userUid = req.headers["authorization"];
//   console.log(userUid);
//   // this ? is creting the problem why ??
//   console.log(req.header);
//   if (!userUid) {
//     return res.redirect("/login");
//   }
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.redirect("/login");
//   }
//   req.user = user; // here we put the user in request object
//   next();
// };

// const checkAuth = async (req, res, next) => {
//   // const userUid = req.cookies.uid;
//   // this ? is creting the problem why ??
//   console.log(req.headers);

//   const userUid = req.headers["authorization"];

//   const token = userUid.split("Bearer ")[1];

//   const user = getUser(token);

//   req.user = user; // here we put the user in request object

//   next();
// };