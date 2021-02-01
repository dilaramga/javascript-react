import express from 'express';
import bodyParser from 'body-parser';
import data from './data';
import dotenv from 'dotenv';
import  mongoose  from 'mongoose';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
dotenv.config();
const app = express();
app.use(bodyParser.json());

const mongodburl = config.MONGODB_URL;
mongoose.connect(mongodburl,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason));

app.use('/api/users',userRoute);
app.use('/api/products',productRoute);

// app.get('/api/products',(req,res) => {
//     res.send(data.products);
// })

// app.get('/api/products/:id',(req,res)=>{
//     const product_id = req.params.id;
//     const product = data.products.find(x => x._id ===product_id);
//     if (product)
//         res.send(product);
    
//     else 
//         res.status(404).send({msg:'Item does not exist'});
    

// });

app.listen(5000,()=> {
    console.log('Listening to http:/localhost:5000');
});