//模块化主文件
require.config({
  paths: {
    'jquery': 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    'bootstrap':'https://cdn.bootcss.com/twitter-bootstrap/3.4.1/js/bootstrap.min'
  },
  shim:{
    'bootstrap':{
      deps:['jquery']
    }
  }
})
require(['jquery','bootstrap'],function(){
  let targetpage=$('#currentpage').attr('targetpage')
  require([targetpage])
})