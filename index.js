const express = require("express");

const app = express();

const cookieParser = require("cookie-parser") ;

const { ConnectMongoDb } = require("./Connection");

const { logReqRes } = require("./middlewares");

const StaticRouter = require("./Routes/StaticRouter")

const UrlRoute = require("./Routes/Urls");

const UserRoute  = require("./Routes/user");

const path = require("path");

const {checkForAuthentication,restrictTo}  = require("./middlewares/auth");

ConnectMongoDb(
  "mongodb+srv://admin:donbosco1234@cluster01.3ahz9.mongodb.net/UrlShortener?retryWrites=true&w=majority&appName=Cluster01"
).then(() => {
  console.log("Mongodb Connected");
});

app.set("view engine","ejs"); 
app.set("views",path.resolve("./View"));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));//to parse form data 

app.use(express.json());

app.use(logReqRes("log.txt"));
app.use(checkForAuthentication);

//ye middelware laga diye befor going to the urls
app.use("/api/url" ,UrlRoute);

//StaticRouter is only for html page 
app.use("/",StaticRouter);

app.use("/user",UserRoute);


 


app.listen(8000, () => {
  console.log("Server Started");
});
