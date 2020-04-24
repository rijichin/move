define([],function(){
  let commentTitle=$('#commentTitle');
  let commentContent=$('#commentContent');
  $('.subComment').on('click',function(){
    let $mid=$(this).attr('mid');
    let $commentTitle=commentTitle.val().trim();
    let $commentContent=commentContent.val().trim();
    if($commentTitle&&$commentContent){
      $('#myModal').modal('show');
      $('.querybtn').on('click',function(){
        $('#myModal').modal('hide');
        $.ajax({
          type:'post',
          url:'/comment/pinglun',
          data:{
            title:$commentTitle,
            content: $commentContent,
            mid:$mid
          }
        }).done(function(d){
          console.log(d)
          if(d==='0'){    
            $('#susModal').modal('show'); 
            $('.susquery').on('click',function(){
              location.href='/comment/commlist';
            })
          }
          if(d==='1'){
            $('#failModal').modal('show')
          }
        })
      })
     
    }
  })
})