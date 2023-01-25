import express, { Router } from "express";
import {addUser , getUserFriends ,addRemoveFriends} from "../controllers/getUsers.js"
import {verifyToken} from "../middelware/authorize.js"

const router = express.Router();

// read all users

router.get("/:id", verifyToken , addUser );
router.get ("/:id/friends" ,verifyToken , getUserFriends)

// update user

router.patch("/:id/friendsId", verifyToken , addRemoveFriends);

export default router;
