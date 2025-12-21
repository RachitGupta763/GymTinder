const express=require("express");
const connectDB = require("./config/database");
const app=express();
 
const cookieParser = require("cookie-parser");
const requestRouter = require("./router/request");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const userRouter = require("./router/user")
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const http = require('http');
const initializeSocket = require("./utils/socket");
const server = http.createServer(app)


const corsOptions = {
  origin:[
  'http://localhost:5173', // must match your frontend's origin
  'http://13.62.54.107'  // your deployed frontend
  ],       
  credentials: true,                 // allow credentials (cookies, headers)
};

initializeSocket(server);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);


connectDB().then(() =>{
        console.log("Database Connected Successfully");
        server.listen(process.env.PORT,()=>{
            console.log("Sever is running at Port 7771");
        });
    })
    .catch((err) =>{
        console.log("Database Connected Unsuccessfully",err);
    })




