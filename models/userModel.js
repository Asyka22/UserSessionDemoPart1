

// const uri = "mongodb+srv://FullStack:Conestoga@cluster0.1ua8had.mongodb.net/TrueUsers?retryWrites=true&w=majority&appName=Cluster0";

import mongoose from 'mongoose';
 
import {} from 'dotenv/config'
 
const uri = process.env.MONGO_URI

mongoose.connect(uri).then(()=>{console.log("Connected to Mongodb")})
.catch((error)=>{console.log(`Connection failed due to Error Below \n ${error}`)})

const userSchema =mongoose.Schema({

    name :{type:String,required:true},
    password : {type:String,required:true},
    email : {type:String,required:true}
})

const userModel = mongoose.model('uzer',userSchema)

export default userModel