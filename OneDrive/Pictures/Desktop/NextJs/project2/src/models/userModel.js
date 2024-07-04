import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username required"],
        unique:[true, "Username already taken, try again"]
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique : [true,"Email already taken"]
    },
    password:{
        type:String,
        required:[true,"Password Required"],
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

});

const User =  mongoose.models.users || mongoose.model("users",userSchema);
export default User;