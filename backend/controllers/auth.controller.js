const {user} = require('../models/schema')

const register = (req , res) => {
    const obj = req.body
    user.find({$or:[{name:obj.username},{email : obj.email}]}).then(ress=>{
        if(ress.length>0){
            if(ress[0].name == obj.username) res.send("username exist")
            else res.send("email exist")
        }else{
            const user_info = new user({
                name : obj.username ,
                email : obj.email ,
                password1 : obj.password1 ,
                password2 : obj.password2 ,
            })
            user_info.save() ;
            res.send("user register successfully")
        }
    })
}


const login = (req,res)=>{
    const obj = req.body
    user.find({email:obj.email,password1:obj.password1}).then(ress=>{
        res.send(ress)
    })
}

module.exports = {register , login}