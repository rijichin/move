const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const userSchema=new Schema({
  username:String,
  nickname:String,
  password:String,
  email:String,
  age: Number
})
exports.User=mongoose.model('user',userSchema)

const moveSchema=new Schema({
  "rating" :Object,
  "genres" :Array, 
  "title" : String, 
  "casts" : Array, 
  "collect_count" : String, 
  "original_title" : String, 
  "subtype" : String, 
  "directors" : Array, 
  "year" : String, 
  "images" : Object, 
  "alt" : String, 
  "id" : {
    type:String,
    unique:true
  }
})
exports.Move=mongoose.model('move',moveSchema);

const commentSchema=new Schema({
  title: String,
  content: String,
  username:String,
  time:String,
  mid: String,
  mtitle:String,
  mpic:String
})
exports.Comment=mongoose.model('comment',commentSchema)
