console.log("welcome")

import express from 'express'
 
import session from 'express-session'
 
import {} from 'dotenv/config'
 
import { MemoryStore } from 'express-session'
import path from 'path';
import { fileURLToPath } from 'url';
 
const uri = process.env.MONGO_URI
 
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const   app = express()

app.use(session({
    secret : "Any hidden key ",
    resave : false,
    saveUninitialized : false,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      })
}))


import router from './routes/routes.js'
 
import ejs from 'ejs'
 
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
 
app.use(express.urlencoded({extended:true}))
 
const PORT = process.env.PORT || 8080  




app.listen(PORT,()=>{
 
    console.log(`App is listening at port ${PORT}`)
})
 
 
app.get('/home',(req,res)=>{
 
   
    console.log(req.session)
 
    req.session.user = "Albert"
 
    console.log(req.session)
    res.render('home.ejs')
})
 
app.use('/',router)