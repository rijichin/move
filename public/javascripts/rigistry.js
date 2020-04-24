define([],function(){
  let usernameInput=$('#usernameInput');
  let nicknameInput=$('#nicknameInput');
  let PasswordInput=$('#PasswordInput');
  let repeatInput=$('#repeatInput');
  userBlur:(function(){ 
    usernameInput.on('blur',function(){
      if($(this).val().trim()!==''){
        $(this).next('span').html('')
        $.ajax({
          type:'post',
          url:'/users/rigistry',
          data: {
            username:usernameInput.val()
          }
        }).done(function(response){
          // console.log(response)
          if(response==='1'){
            $('#usernameInput').next('span').html('用户名存在')
          }
          if(response==='2'){
            $('#usernameInput').next('span').html('服务器错误')
          }
        })
      }else{
        $(this).next('span').html('用户名不能为空')
      }
      
    })
  })();
  regiClick:(function(){
    $('.regibtn').on('click',function(){
      $.ajax({
        type:'post',
        url:'/users/rigistry',
        data:{
          username:usernameInput.val(),
          nickname:nicknameInput.val(),
          password:PasswordInput.val(),
          repass:repeatInput.val()
        }
      }).done(function(response){
        // console.log(d)
        if(response==='1'){
          $('#usernameInput').next('span').html('用户名存在')
        }
        if(response==='2'){
          alert("服务器错误")
        }
        if(response==='3'){
            alert('数据不能为空')
        }
        if(response==='0'){
          alert('注册成功，将跳转到登录界面');
          location.href='/login'
        }
        if(response==='4'){
          alert('两次密码不一致');
        }
      })
    })
  })()
})