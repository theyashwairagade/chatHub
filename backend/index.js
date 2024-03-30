const express=require('express');
const {Server}=require("socket.io");
const http=require("http");
const cors=require("cors");

const app=express();
app.use(cors);

// From documentation of socket.io
const server=http.createServer(app);
const io=new Server();

const port=8000;

app.get('/',(req,res)=>{
    res.send("Chat started");
})

app.listen(port,()=> console.log(`App started at http://localhost:${port}`));