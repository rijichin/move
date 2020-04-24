const mongoose=require('mongoose')
const hostname='0.0.0.0'
const port=27017;
const dbname='Movemanage'
const con_mon=`mongodb://${hostname}:${port}/${dbname}`
mongoose.connect(con_mon,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
  if(err) throw err;
  console.log('数据库连接成功')
})
const connection=mongoose.connection;
exports.connection=connection;
