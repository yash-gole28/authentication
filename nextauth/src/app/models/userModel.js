const { Schema, default: mongoose } = require("mongoose");


const user = new Schema({
    username : {
        type : String,
        required : true , 
        unique : true
    },
    email : {
        type : String , 
        required : true , 
        unique : true
    },
    password : {
        type : String ,
        required : true
    }
},{
    timestamps:true
})

const Users = mongoose.models.users || mongoose.model("users",user)

export default Users