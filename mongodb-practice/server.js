const express = require('express');
const app = express();
const path = require('path')
const port = 3000;
const User = require('./model/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const JWT_SECRETE = 'dfsfkjslfkjsdfksdhfhh9eru932u89324793287498@#@$@##%$5248098098*&(*&R(*&#$(*&'

const mongooseUri = 'mongodb+srv://ambrahamjeevan:K9JEZf9GVyYlRH56@cluster0.zfb2ydg.mongodb.net/'
mongoose.connect(mongooseUri)

app.use('/',express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())  
  
app.post('/api/login',async (req,res)=> {
    console.log(req.body)
    const {username,passowrd} = req.body
    const user = await User.findOne({username}).lean()
    try{
        if(!user){
            return res.json({status:'error',error:'invalid username or pass'})
        }
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({
                id:user.id,
                username:user.username
            },JWT_SECRETE)
           return res.json({status:'ok',data:token})
        }
        else{
            return res.status(401).json({ status: 'error', error: 'Invalid username/password' });
        }

    }
    catch(error){
        console.log(error);
        res.json({status:'error',message:error})
    }
}) 


app.post('/api/register',async (req,res)=> {
    console.log(req.body);
    const {username,password:plaintextpassword} = req.body
    if(!username||typeof username != 'string'){
       return  res.json({status:'error',error:'invalid username'})
    }
    if(!plaintextpassword||typeof plaintextpassword !='string'){
       return  res.json({status:'error',error:'invalid password'})
    }
    if(plaintextpassword.length < 5){
        return res.json({status:'error',error:'minimum length 5 required'})
    }
    const password = await bcrypt.hash(plaintextpassword,10)
    try{
        const response =await User.create({
            username,
            password 
        })
        console.log('user created successfully',response)
        res.json({status:'ok'})
    }
    catch(error){
        if(error.code = 11000){
            return res.json({status:'error',error:'username already exists'})
        }
        if(error){
            throw(error) 
        }
    }

   

})

app.listen(port,()=> {
    console.log(`http://localhost:${port}`) 
})
 
