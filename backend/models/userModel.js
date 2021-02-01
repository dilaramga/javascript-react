import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true, dropDups:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false}
});

const userModel = Mongoose.model('User',userSchema);
export default userModel;