require('dotenv').config();
const express=require('express');
const {Server}=require("socket.io");
const http=require("http");
const cors=require("cors");

const app=express();
app.use(cors());

const port=process.env.PORT||8000;
const frontendURL=process.env.REACT_APP_FRONTEND_URL||'http://localhost:3000';

// From documentation of socket.io
const server=http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: frontendURL,
        methods: ["GET","POST"]
    }
});
io.on("connection", (socket) => {
    socket.on("joinRoom",(room)=>{
        socket.join(room);
    });
    socket.on("newMessage",({newMessage,room})=>{
        io.in(room).emit("UnreadMessage",newMessage);
    })
});


app.get('/',(req,res)=>{
    res.send("Chat started");
})

server.listen(port,()=> console.log(`App started at http://localhost:${port}`));