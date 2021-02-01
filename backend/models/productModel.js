import Mongoose from 'mongoose';

const productSchema = new Mongoose.Schema({
    name:{type:String, required:true},
    brand:{type:String,required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true,default:0},
    category:{type:String, required:true},
    countInStock:{type:Number, required:true,default:0},
    description:{type:String, required:true},
    rating:{type:Number, required:true,default:0},
    numReviews:{type:Number, required:true, default:0}
});

const productModel = Mongoose.model('Product',productSchema);
export default productModel;