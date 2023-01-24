import getUsers from "../controllers/getUsers";
import router from "../routes/user";

export const getUser = async (req,res)=>{
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