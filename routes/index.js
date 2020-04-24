var express = require('express');
var router = express.Router();
const {User,Move}=require('../ulits/model')
const {sessionCheck}=require('../ulits/check')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home',(req,res)=>{
  res.render('home.ejs',{
    username: req.session.username||""
  })
})
router.get('/logout',(req,res)=>{0

  req.session.destroy(()=>{
    res.redirect("/home");
})
})
router.get('/rigistry',(req,res)=>{
  res.render('rigistry.ejs')
})
router.get('/login',(req,res)=>{
  res.render('login.ejs')
})
router.get('/my',function(req,res){
  if(req.session.username){
    User.findOne({username:req.session.username}).then((result)=>{
      // console.log(result)
      res.render('person.ejs',{
        username:result.username,
        nickname:result.nickname,
        age:result.age||"",
        email:result.email||""
      })
    })
    
  }else{
    res.send(`<script>alert("您还没有登录，请先登录");location.href="/login"</script>`)
  }
})
router.get('/resetpwd',function(req,res){
  // if(req.session.username){
  //   res.render('resetpass.ejs')
  // }else{
  //   res.send(`<script>alert("您还未登录，请先登录");location.href="/login";</script>`)
  // }
  sessionCheck(req,res,function(){
    res.render('resetpass.ejs');
  })
})
router.get('/list',function(req,res){
  sessionCheck(req,res,function(){
    let query=req.query;
    let searchObj={};
    let sortObj={};
    if(query.keywords){
      searchObj={
        $or:[
          {title:new RegExp(req.query.keywords)},
          {year:new RegExp(req.query.keywords)},
          {"rating.average":new RegExp(req.query.keywords)}
        ]
      }
    }else{
      sortObj=query
    }
    Move.find(searchObj).sort(sortObj).then((result)=>{
      // console.log(result)
      res.render('list.ejs',{
        result:result
      })
    })
  })
  // console.log(req.query)
  // if(req.session.username){
  //   let query=req.query;
  //   let searchObj={};
  //   let sortObj={};
  //   if(query.keywords){
  //     searchObj={
  //       $or:[
  //         {title:new RegExp(req.query.keywords)},
  //         {year:new RegExp(req.query.keywords)},
  //         {"rating.average":new RegExp(req.query.keywords)}
  //       ]
  //     }
  //   }else{
  //     sortObj=query
  //   }
  //   Move.find(searchObj).sort(sortObj).then((result)=>{
  //     // console.log(result)
  //     res.render('list.ejs',{
  //       result:result
  //     })
  //   })
  // }else{
  //   res.send(`<script>alert("您还未登录，请先登录");location.href="/login";</script>`)
  // }
 
})
module.exports = router;
