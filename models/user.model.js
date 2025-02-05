import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
        minLength:[5,'Name should contain at least 5 char'],
        lowercase:true,
        trim:true,
    },
    userId:{
        type:String,
        unique:true,
        require:true

    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        require:true,
        unique:[true,'email id already registered']
    },
    password:{
        type:String,
         minLength:[6,'password must contain at leat 6 char']
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:["CUSTOMER",'ADMIN']
    }
},{timestamps:true,versionKey:false})
const userModel = model("User",userSchema);

export default userModel