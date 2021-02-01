import express from 'express';
import isAdmin from '../util';
import isAuth from '../util';


import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post("/signin", async (req,res) => {

    try{
    
   
    const signinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    
    if (signinUser) {
        res.send({
            _id:signinUser.id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token:getToken(signinUser)

        });
    }
    else {
        res.status(401).send({msg:'Invalid username or password'});
    }
} catch(error){
    res.send(error.message);
}

});

router.post("/register", async (req,res)=>{    

    try {


    

        const registerUser = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
         const registerduser = new User(registerUser);
         const user = registerduser.save();

         if (user) {
            res.send({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:getToken(user)
    
            });
            
        }

        else {
            res.status(401).send({msg:'Invalid registar'});
        }
    } catch (error){
        res.send({msg:error.message});
    }
        
})

router.get("/createadmin", async (req,res)=>{

    

    try {
        const admin1 = {
            name:'dilu',
            email:'dilu_gaa@yahoo.com',
            password:'1234',
            isAdmin:true
        }

        const alreadyAdmin = await User.findOne({
            email:admin1.email            
        });

        if (alreadyAdmin) {
            res.send(alreadyAdmin);
        }
        else {
            const user = new User(admin1);
            const newUser = await user.save();
            res.send(newUser);

        

        
        
        
    } 
}catch (error) {
        res.send({msg:error.message});
        
    }
   
})
export default router;