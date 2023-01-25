import getUsers from "../controllers/getUsers.js";
import router from "../routes/user.js";

export const getUsers = async (req,res)=>{
    try{
        const {id} = req.query;
        const user = await getUsers.findById(id);
    }catch(err){
        res.status(403).json({message:err.message})
    }
}

export const  getUserFriends = async (req,res)=>{

    try{
        const {id} = req.query;
        const user = await getUserFriends.findById(id)
        const friends = await Promise.all(
            user.friends.map((id)=>user.findById(id))
        )
            const formatFriends = friends.map(
                ({_id,firstName , lastName , occupation ,location, imagePath})=>{
                    return {_id,firstName , lastName , occupation ,location, imagePath}
                })
                res.status(200).json(formatFriends)
    }catch(err){
    res.status(403).json({message:err.message})
}
}

// update a user------------------------------------------------------------------------------------------------

const addRemoveFriend = async (req,res)=>{
    try{
        const {id ,friendId}= req.body; // we are getting the user id and friend id
        const user = await user.findById(id); // finding the user

        const  friend = await user.findById(friendId); // finding the friend

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>(id)!= friendId)  // we are removing the friend
            friend.friends = friend.friends.filter((id)=>(id)!=id)  //  we are removing the friend    
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>user.findById(id))
        )
            const formatFriends = friends.map(
                ({_id,firstName , lastName , occupation ,location, imagePath})=>{
                    return {_id,firstName , lastName , occupation ,location, imagePath}
                })
                res.status(200).json(formatFriends)

    }catch(err){
        res.status(403).json({message:err.message})
    }
}



