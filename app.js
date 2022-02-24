const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./modals/user');
const bcrypt = require('bcrypt');
const { is } = require('express/lib/request');

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

app.post('/register', async(req,res)=>{
    let {username, password} = req.body;   
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User ({username, password: hashPassword});
    user.save();
    res.redirect('/')
})

app.get('/login', (req,res)=>{
    res.render('login.ejs');
});

app.post('/login', async(req,res)=> {
    let {username, password} = req.body;
    const user = await User.findOne({username})
    const isValidUser = await bcrypt.compare(password, user.password);
    if(!isValidUser) return res.redirect('/login');
    return res.redirect('/')
});

app.listen(3000, ()=> console.log('Port 3000'));