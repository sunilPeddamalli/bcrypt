const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./modals/user')

mongoose.connect('mongodb://localhost/bcrypt')
    .then(()=>{
        console.log('connected to MongoDB for Bcrypt');
    }).catch(e =>{
        console.log('Mongo Error - Bcrypt');
        console.log(e);
    });

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=> {
   res.send('Home Page!!!');
});

app.get('/register', (req,res)=> {
   res.render('register.ejs')
})

app.post('/register', (req,res)=>{
   let {username, password} = req.body;   
   res.redirect('/')
})

app.listen(3000, ()=> console.log('Port 3000'));