class usersModel{
    constructor(){
        this.users = [] 
    }
    addUser = (user)=>{
        this.users.push(user) ;
        
    }
    removeUser = (name) => {
        const index = this.users.findIndex((user) => user.name === name);
        if(index !== -1) return this.users.splice(index, 1)[0];
    }
    usersFilter = (room) => {
        let array1 = this.users.filter(user=>user.Room==room).map(user=>user.name+"&"+user.Room) ; 
        let array2 = [...new Set(array1)] ;
        let array = array2.map(user=>user.slice(0, user.lastIndexOf('&')))
        return array ; 
    }
}

let usersInstance = new usersModel() ; 

module.exports = usersInstance