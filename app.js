const express = require('express');
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=> {
   res.send('Home Page!!!');
});

app.get('/login', (req,res)=> {
   res.render('login.ejs')
})

app.post('/login', (req,res)=>{
   res.send(req.body);
})

app.listen(3000, ()=> console.log('Port 3000'));