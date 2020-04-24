const express=require('express')
const router=express.Router();
const {Move,Comment}=require('../ulits/model')
const {sessionCheck}=require('../ulits/check')

// 电影详情页渲染
router.get('/detail',function(req,res){
  sessionCheck(req,res,function(){
    Move.findOne({
      id:req.query.mid
    }).then((result)=>{
      res.render('comment.ejs',{
        result:result
      })
    })

  })
})

// 评论提交
router.post('/pinglun',function(req,res){
  // console.log(req.body)
  if(req.session.username){
    let body=req.body;
    Move.findOne({id:body.mid}).then((result)=>{
      Comment.insertMany([{
        title: body.title,
        content: body.content,
        username:req.session.username,
        time:new Date(),
        mid: body.mid,
        mtitle:result.title,
        mpic:result.images.large
      }]).then(function(){
        res.send('0')
      }).catch((err)=>{
        console.log(err)
        res.send('1')
      })
    })
  }
})

// 评论列表渲染
router.get('/commlist',function(req,res){
  sessionCheck(req,res,function(){
    Comment.find({}).then((result)=>{
      // console.log(result)
      res.render('commlist.ejs',{
        username:req.session.username,
        result:result
      })
    })
  })
})
// 未登录页面
router.get('/onlogo',function(req,res){
  res.render('unlogin.ejs')
})
// 删除评论
router.post('/delete',function(req,res){
  if(req.session.username){
    console.log(req.body)
    Comment.deleteMany(req.body).then(()=>{
      res.send('0')
    }).catch(()=>{
      res.send('1')
    })
  }else{
    res.send('3')
  }
})
module.exports=router;