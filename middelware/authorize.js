import jwt from "jsonwebtoken";

export const  verifyToken = async ( req , res, next )=>{          // next is used to continue to the next middleware

    try{

        let token = req.header("Authorization")   // get the token from the header

        if(!token){
           if(!token){
            return res.status(403).send("acces denied");
           }
           if(token.startsWith("Bearer ")){  // check if the token starts with Bearer

           token = token.slice(7,token.length).trim.length;  //remove the Bearer from the token and get the length of the token
            const verified = jwt.verify(token ,process.env.JWT_SECRET);// verify the token
            req.user = verified; // set the user in the request object
            next();
           } 
        }
    }catch{
        (err)=>{
            console.log({message :err.message});
        }
    }

}