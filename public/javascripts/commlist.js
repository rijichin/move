//电影列表页操作
define([],function(){
  let deletItem=$('.deletItem');
  let changItem=$('.changItem');
  // 删除操作
  deletItem.on('click',function(){
    $('#delteModel').modal('show');
    let $deItem= $(this).parent().parent();
    let $mid=$(this).attr('mid')
    $('.deleteSure').on('click',function(){
      $('#delteModel').modal('hide');
      $.ajax({
        type:'post',
        url:'/comment/delete',
        data:{
          mid:$mid,
        }
      }).done(function(d){
        if(d==='0'){
          $deItem.remove()
        }
        if(d==='3'){
          location.href='/comment/onlogo'
        }
      })
    })
  })
})