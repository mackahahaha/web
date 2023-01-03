var express = require('express');
var app = express();
var list_user = [
    { username: "PDT", mail: "thanh@mail.com",password:"thanhzai", id:1, }
];
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/api/user', (req, res)=>{
   res.send("i'm running");
   
});

app.post('/api/user/contact',(req,res)=>{
    res.json({
       message:"Cam on da dong gop y kien.Chung toi se phan hoi lai ban som",
    });
});

app.post('/api/user/book',(req,res)=>{
    res.json({
       message:"Dat chuyen di thanh cong",
    });
});

app.post('/api/user/register',(req,res)=>{
    var obj ={
        username : req.body.username,
        mail: req.body.mail,
        password: req.body.password,
        id: list_user.length +1,
    }
    var check = true;
    for(let i= 0; i< list_user.length;i++){
        if(obj.mail == list_user[i].mail){
            check = false;
            break;
        }
    }
    if(check == true){
        list_user.push(obj);
        res.json({
            message:"dang ky thanh cong",
            valid: true,
        });
    }
    else{
        res.json({
            message:"email nay da duoc su dung ",
            valid:false,
        });
    }
})



app.post('/api/user/checklogin',(req, res)=>{
    var username = req.body.username;
    var password = req.body.password;
    for(let i= 0; i< list_user.length;i++){
        if(username== list_user[i].mail && password== list_user[i].password){
            res.json({
                account: {
                    username: list_user[i].username,
                    id: list_user[i].id,
                    token:"asdkfhsdfj.kjhadskfhaskhfjksdf.kahsdksjdhfjhsdjkf",
                }
            });
        }
    }
    res.status(400);
    res.json({
        message:"Login fail."
        });
    

});
app.listen(3000,()=>{
    console.log("Cong 3000 da  mo.");
});