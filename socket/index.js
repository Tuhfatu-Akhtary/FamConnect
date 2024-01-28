const io =require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:5173",
    }
})

let users=[];

const addUser=(userId,socketId)=>{
    !users.some(currentUser=>currentUser.user_id ===userId)&&
        users.push({userId,socketId});
}
io.on("connection",(socket)=>{
    console.log("a user connected")
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users)
    })
})