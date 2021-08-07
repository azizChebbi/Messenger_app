const mongoose = require('mongoose')

const userId = new mongoose.Schema({
    name : String ,
    email : String ,
    password1: String , 
    password2: String  
})

const user = mongoose.model('users' , userId);

const MessageId = new mongoose.Schema({
    name : String ,
    sender : String,
    time : Number , 
    message : String ,
     
})

const message = mongoose.model('messages',MessageId) ; 

module.exports = {user,message} ;