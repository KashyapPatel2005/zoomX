// const express = require("express");
import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";


import userRoutes from "./routes/users.routes.js";
import connectToSocket from "./controllers/socketManager.js";
import exp from "node:constants";
import { execPath } from "node:process";

const app = express();      //create express app


const server = createServer(app);
// const io = new Server(server);       //connect server to socket
const io = connectToSocket(server);



app.set("port", (process.env.PORT || 8080));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb", extended:true}))

app.use("/",userRoutes);

// app.get("/",(req,res)=>{
//     res.send('Hii');
// })

const start = async() =>{
    // app.listen(8080,()=>{
    //     console.log("Listening on port 8000");
    // })

    server.listen(app.get("port"), async()=>{
        const connectDb = await mongoose.connect("mongodb+srv://kp2037723:5L6p0Coqw1vbVUYM@cluster0.hkg89.mongodb.net/");
        console.log("MongoDb connected");
        console.log("listening on port ",app.get("port"));
    })
}
start();