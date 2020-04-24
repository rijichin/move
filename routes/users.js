var express = require('express');
var router = express.Router();
const md5= require('md5');
const { sessionCheck }=require('../ulits/check')
const {User}=require('../ulits/model')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 注册
router.post('/rigistry',function(req,res){
  // User.find()
  let body=req.body
  // console.log(body)
  //  if(body.username){
    User.find(body).then(result=>{
      console.log(result)
      if(result.length>0){
        res.send('1')
      }else{
        if(body.password&&body.username&&body.nickname&&body.repass){
          if(body.password==body.repass){
            body.password=md5(body.password)
            User.insertMany(body).then(()=>{
              res.send('0')
            })
          }else{
            res.send('4')
          }
        }else{
          res.send('3')
        }
      }    
    }).catch(err=>{
      res.send('2')
    })
  // }else{
  //   res.send('3')
  // }
   
})
// 登录
router.post('/login',function(req,res){
  req.body.password=md5(req.body.password);
  // console.log(req.body);
  User.find(req.body).then((result)=>{
    // console.log(result)
    if(result.length>0){
      req.session.username=req.body.username;
      res.send(`<script>alert("登录成功，即将跳转到home页面");location.href="/home"</script>`);
    }else{
      res.send(`<script>alert("用户名或密码错误");location.href="/login"</script>`)
    }
  }).catch((err)=>{
    throw err;
  })
  // User.find(req.body,(err,data)=>{
  //   console.log(data)
  // })
})
// 修改信息
router.post('/changeInfo',function(req,res){
  // console.log(req.body)
  console.log(req.session.username)
 sessionCheck(req,res,function(){
   console.log('llllll')
  User.updateMany({username:req.session.username},req.body).then(()=>{
    res.send('0')
  }).catch((err)=>{
    res.send('1')
  })
 })
})
// 重置密码
router.post('/resetpwd',function(req,res){
  sessionCheck(req,res,function(){
    let body=req.body;
    body.oldpassword=md5(body.oldpassword);
    body.newpassword=md5(body.newpassword);
        User.findOne({username:req.session.username}).then((result)=>{
        if(result.password==body.oldpassword){
          User.updateMany({username:req.session.username},{
            $set:{password:body.newpassword}
          }).then(()=>{
            res.send(`<script>alert("密码修改成功");location.href="/my"</script>`)
          })
        }else{
          res.send(`<script>alert("密码不正确");location.href="/resetpwd"</script>`)
        }
      }) 
  })
})
module.exports = router;
