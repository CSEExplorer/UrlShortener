const express = require("express");

const router = express.Router();

const Url = require("../Model/Urls");

router.get("/",(req,res)=>{
    if(!req.user) return res.redirect("/login");
    return res.render("home");
})


router.get("/analytics", async (req, res) => {
  if(!req.user)return res.redirect("/login");
    
  const LoggedInUrls = await  Url.find({createdBy:req.user._id});
  return res.render("tableUrl", { Urls: LoggedInUrls });
});



router.get("/signup", async(req,res)=>{
    return res.render("signup");
})

router.get("/login", async (req, res) => {
  return res.render("login");
});


module.exports = router;


