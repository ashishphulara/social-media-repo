
import Post from "../models/post.js";
import user from "../models/User.js"
// Create

export const createPost = async (req , res)=>{         // getting images from index.js line- 61 .
    try{
        const { userId , description , imagePath} = req.body  // getting images from index.js from the frontend.
        const user = await user.findById(userId)
        const newpost = new post ({
            userId,
            firstName :user.firstName,
            lastName  : user.lastName,
            location : user.location,
            description,
            userImagePath : user.imagePath,
            picturePath,
            likes :{},  // ==> here it will register as {an_id : true}
            comments : []            
        })
        
        await newpost.save();
        const post = await post.find()    // return all the posts to the frontend.
        res.status(201).json({post}); 
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

// read the post --------------------------------
 export const getAllPosts = async (req ,res)=>{       // it will grab  all the posts as news feeds 
    try{
        const post = await post.find();
        res.status(200).json({post})
    }catch(err){
        res.status(404).json({message : err.message})
    }
}

export const getUserPost = async(req,res)=>{
    try{
        const {userId} = req.params;
        const post = await post.find({userId})
        res.status(200).json({post});
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

// update 

export const updateUser = async (req , res)=>{
    try{
        const {id} = req.params; // getting the id of the post.
        const {userId} = req.body // getting the id of the user.

        const post = await post.findById(id) // finding the post by the id.

        const isLiked = post.likes.get(userId); // checking if the user has liked the post.


        if(isLiked){
            post.likes.delete(userId); // delete the like
        }else{
            post.likes.set(userId , true); // add the like
        }
        const updatePost = await post.findByIdAndUpdate(  // updating the post.
            id,
            {likes : post.likes},
            {new :true} // returning the updated post.
        );
        res.status(200).json({updatePost})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}