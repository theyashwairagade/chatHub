const express=require('express');
const {Server}=require("socket.io");
const http=require("http");
const cors=require("cors");

const app=express();
app.use(cors);

const port=8000;

// From documentation of socket.io
const server=http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});


app.get('/',(req,res)=>{
    res.send("Chat started");
})

app.listen(port,()=> console.log(`App started at http://localhost:${port}`));