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
io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.on("joinRoom",(room)=>{
        // console.log(room);
        socket.join(room);
    });
    socket.on("newMessage",({newMessage,room})=>{
        console.log(room,newMessage);
        // socket.emit("UnreadMessage",newMessage)
        io.in(room).emit("UnreadMessage",newMessage);
    })
});


app.get('/',(req,res)=>{
    res.send("Chat started");
})

server.listen(port,()=> console.log(`App started at http://localhost:${port}`));