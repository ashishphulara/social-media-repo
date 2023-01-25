import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type : String,
            required :true 
        },

        firstName :{
            type : String,
            required :true
        },
        lastName :{
            type : String,
            required :true
        },
        location : String,
        description :String,
        imagePath:String,
        likes :{
            type : map,
            of :Boolean
        },
        comments : {
            type : Array,
            default : []
        } 
    }, {timestamps :true}
)

const post = mongoose.model("post",postSchema);
export default post;