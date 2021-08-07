const {user , message} = require('../models/schema')

const users = (req,res)=>{
    user.find({},{name:1}).then(ress=>{
        res.send(ress)
    })
}

const messages = (req,res)=>{
    message.find({name : req.query.room}).then(ress=>{
        res.send(ress)
    })
}

module.exports = {users,messages}