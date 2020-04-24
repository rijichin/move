//检查是否登录
function sessionCheck(req,res,callback){
 
  if(req.session.username){
    callback()
  }else{
    res.render('unlogin.ejs')
  }
}
exports.sessionCheck=sessionCheck;