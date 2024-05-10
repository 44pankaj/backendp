const mongoose= require("mongoose");
const GetRoute=require('./Get.route');
const {Schema}= mongoose;

let user= new Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
   
    email:{
        type: String
    },
    number:{
        type: Number
    },
    message:{
     type:String
    }
},
{
collection:"data"
});
module.exports= mongoose.model("data",user)