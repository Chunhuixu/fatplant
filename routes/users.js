var express=require('express');
var router=express.Router()
const bcrypt=require('bcryptjs');
//const passport=require('passport');

router.get('/login',function(req,res){
    res.render('login/login',{
      title:'Login',
    });
});

router.post('/login',function(req,res,next){
    let query={username:req.body.username}
    var dbo=require('../db/db').getconnect();
    var collection=dbo.collection("Users");
    collection.findOne(query,function(err,result){
        if(err) throw err;
        if(!result){
            return "No User Found";
        }
        bcrypt.compare(req.body.password,result.password,function(err,isMatch){
            if(err) throw err;
            if(isMatch){
                let user={username:result.username}
                res.cookie("LOGIN",user);
                res.redirect('/');
            }
        });
    })
});

router.get('/register',function(req,res){
    res.render('login/register',{
      title:'Register'
    });
});

router.post('/register',function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const confirm=req.body.confirm;
    if(password===confirm){
        let newUser={
            username:username,
            password:password
        };
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
                if(err) throw err;
                newUser.password=hash;
                var db=require('../db/db').getconnect();
                var collection=db.collection("Users");
                collection.insertOne(newUser,function(err){
                    if(err) throw err;
                    res.redirect('/users/login')
                });
            });
        });
    }
    else{
        res.render('login/register',{
          title:'Passwords have to match please try again',
        });
    }
});

router.get('/logout',function(req,res){
  res.clearCookie("LOGIN");
  res.redirect('/');
});
module.exports=router;
