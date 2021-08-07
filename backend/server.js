const express = require('express')
const app = express() ;
const http = require('http').createServer(app) ;
const io = require('socket.io')(http) ;
const formatMessage = require('./utils/formatMessage');
const usersInstance = require('./models/users')
const {message} = require('./models/schema')
const mongoose = require('mongoose') ;
const router = require('./router/router')
const cors = require('cors')
const {graphqlHTTP} = require("express-graphql")
const skeleton = require('./models/skeleton')
require('dotenv').config() ;


app.use(cors()) ;
app.use(express.json()); 
app.use(router)
app.use('/graphql' , graphqlHTTP({
    schema:skeleton ,
    graphiql :true
}))


io.on('connection', (socket) => {
    socket.on("join",({name,room})=>{
        //add user 
        const user = {name , Room:room}
        usersInstance.addUser(user)
        socket.join(room) ;
       
        //emit room data
        let array = usersInstance.usersFilter(room) 
        io.to(room).emit('roomData' , {Users:array})
        
        //recieving messages from users and send them
        socket.on('send' , (m)=>{
            const messageTime = new Date().getTime()
            const Message = new message({
                name : user.Room , 
                sender : m.name , 
                time : messageTime ,
                message : m.ms
            })
            Message.save()
            io.to(room).emit('message' , formatMessage(m.name,m.ms,messageTime)) ; 
        }) 
        //disconnection
        
        socket.on('disconnect', () => {
            usersInstance.removeUser(name)
            let array = usersInstance.usersFilter(room) 
            io.to(room).emit('roomData' , {Users:array})
            socket.disconnect()
        });
    })
    
});


mongoose.connect(process.env.MONGOOSE_URL ,{useNewUrlParser: true}).then(()=>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})


app.get('/' , (req,res)=>{
    res.send('hello there')
})


let port = process.env.PORT || 3001 ;

http.listen(port , ()=>{
    console.log('listening on port ' ,port) ;
})

