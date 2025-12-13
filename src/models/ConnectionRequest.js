const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true ,
        ref :"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref :"User" 
    },
    status:{
        type:String,
        required:true,
        enum :{
             values:["interested","ignored","accepted","rejected"],
             message:`{VALUE} is incorrect status type`
        }
    }
},
{timestamps:true});

connectionRequestSchema.index({fromUserId:1 , toUserId:1});

//pre is a middleware which run before saving in db.
connectionRequestSchema.pre("save" ,function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("Can not send a connection request to yourself");
    }
    next();
})
module.exports = mongoose.model("connectionRequest",connectionRequestSchema);
