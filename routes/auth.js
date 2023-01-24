import express from "express"; // to create an instance of express
import {login} from "../controllers/Checkauth.js"
const Router = express.Router(); // to create an instance of express router

Router.post("/login", login)

export default Router;