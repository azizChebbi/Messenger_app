export const checker = (username,password1,password2)=>{
    let err = null ;
    if(username.length<6) err = "Username must be of length greater than 5 characters"
    else if(username.length>20) err="Username must be of length less than 21 characters"
    else if(password1.length<8) err = "Password must be of length greater than 7 characters"
    else if(password1!=password2) err = "Passwords must be equal"
    return err ; 
}