
import bcrypt from 'bcrypt'
 
// const user = require('../models/userModel.js')
 
import user from '../models/userModel.js'

class Controller{

    static dashboard_get  = (req,res)=>{

        const my_msg = req.session.msg

        delete req.session.msg
       
        res.render("dashboard.ejs",{msg:my_msg})
    }

    static login_post = async (req,res)=>{

        try{
            const data = req.body

            // get the user record based on email as criteria in find({}) method

             const user_to_find = await user.findOne({email:data.uemail})

             console.log(user_to_find)

            

             if(!user_to_find){

                
                console.log("User Not Found in Db ,Redirect to Signup")
                res.redirect('/signup')
            }
             else{
                
                // Now email is matched already ,we have to mtach password

                console.log(user_to_find.password+"======")
                
                

                const pwd_matched = await bcrypt.compare(data.upass,user_to_find.password)

                // if pwd_matched = true both email and pwd matched

                if(pwd_matched){

                    console.log("both email and pwd matched redirect to dashboard")
                   
                    req.session.msg = "Login Successfull Please Proceed To Dashboard"
                    req.session.isValid = true
                    res.redirect('/dashboard')
                }
                // password not matched redircet to login
                else{

                    console.log("Password not Matched redirect to Login")

                    req.session.msg = "Password not Matched Please Enter Correct Password !!!"

                    res.redirect('/login')
                }

                


             }


           
        }
        catch(err){
            res.send(err)
        }
       
    }

    static login_get = (req,res)=>{

        const my_msg = req.session.msg 

        res.render('login.ejs',{msg:my_msg})
    }

   static  home_get = (req,res)=>{

        res.render('home.ejs')
     }

   static signup_get = (req,res)=>{

    res.render('signup.ejs')
   } 
   
   static signup_post =async (req,res)=>{

    try{
    const data = req.body


    const hashed_pwd = await bcrypt.hash(data.upass,10)

    const user_to_save = new user({
        name: data.uname ,
        password: hashed_pwd ,
        email : data.uemail
    })

    const user_saved = await user_to_save.save()

    res.redirect("/login")
    
}catch(err){
        res.send(err)
    }

   }

   static logout_post = (req,res)=>[
 
        req.session.destroy((error)=>{
            if(error) throw error ;

          res.redirect('/login')
        
    })

   ]


}


export default Controller