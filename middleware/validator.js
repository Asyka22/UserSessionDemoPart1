const isValidUser = (req,res,next)=>{

    if(req.session.isValid){

        next()
    }
    else{

        req.session.msg = "Please Login/Signup First To access Dashboard page !!!"
        console.log("You have to Login/Signup First !!!")
        res.redirect('/login')
    }
}

export default isValidUser