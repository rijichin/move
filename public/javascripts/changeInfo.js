define([],function(){
  changeInfo:(function(){
    $('.changeInfo').on('click',function(){
      let nicknameInput=$('#nicknameInput').val().trim()
      let userageInput=$('#userageInput').val().trim()
      let exampleInputEmail1=$('#exampleInputEmail1').val().trim()
      console.log(nicknameInput,userageInput,exampleInputEmail1)
      console.log()
      if(nicknameInput&&userageInput&&exampleInputEmail1){
        $.ajax({
          type:'post',
          url:'/users/changeInfo',
          data:{
            nickname:nicknameInput,
            age:userageInput,
            email:exampleInputEmail1
          }
         
        }).done(function(d){
          console.log(d)
          if(d==='0'){
            alert('信息修改成功')
            location.href='/my'
          }else if(d==='1'){
            alert('信息修改失败')
          }
        })
      }else{
        alert('数据不能为空');
      }
    })
  })();
})