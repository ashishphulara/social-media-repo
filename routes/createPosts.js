import express from "express";
import {getFeedPosts , getUserPosts , getLikes} from "../controllers/post.js"
import { verifyToken } from "../middelware/authorize.js";
const router = express.Router();

// read posts------------------------------------------------------------------------------------------------

router.get("/post",verifyToken ,getFeedPosts);  // get all posts
router.get(":userId/posts",verifyToken,getUserPosts); // get user posts

// update posts------------------------------------------------------------------------------------------------

router.patch("/:id/post" ,verifyToken,getLikes);


export default router;
