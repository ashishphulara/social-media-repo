import express from "express"; // to create an instance of express
import bodyparser from "body-parser"; //  to parse application/x-www-form-urlencoded
import mongoose from "mongoose"; // to connect to mongodb
import cors from "cors"; // to enable cross origin resource sharing
import dotenv from "dotenv"; // to read.env file
import multer from "multer"; // middleware for parsing multipart/form-data
import helmet from "helmet"; // middleware for security
import morgan from "morgan"; // middleware for logging
import path from "path"; // middleware for serving static files
import { fileURLToPath } from "url"; // middleware for serving static files
mongoose.set("strictQuery", true); // to enable strict query
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { verifyToken } from "./middelware/authorize.js";
import { Register } from "./controllers/Checkauth.js"; // for authentication
import createPost from "./routes/createPosts.js";
import User from "./models/User.js";
import post from "./models/post.js"

// configuration------------------------------------------------------------------------------------------------

dotenv.config(); // load environment variables from.env file
const __fileName = fileURLToPath(import.meta.url); // get the path of the current file
const __dirName = path.dirname(__fileName); // get the directory of the current file

const app = express(); // to create an instance of express
app.use(express.json()); // to parse application/json
app.use(helmet()); // to enable cross origin resource sharing
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // to enable cross origin resource sharing
app.use(morgan("common")); // to enable logging
app.use(bodyparser.json({ limit: "50mb", extended: true })); // to parse application/json
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true })); // to parse application/x-www-form-urlencoded
app.use(cors()); // to enable cross origin resource sharing

app.use("/Images", express.static(path.join(__dirName, "public/Images"))); // to serve static files

// routes ---------------------------------------------------------------------------------------------------------

app.use("/auth", authRoutes); // to register a new user
app.use("/users", userRoutes); // for registering a new user
app.use("/posts", postRoutes); //     for registering a new post

// file storage ------------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
  // to store files

  destination: function (req, file, callback) {
    //for storing files
    callback(null, "public/Images");
  },
  fileName: function (req, file, callback) {
    callback(null, file.originamName); // to get the file name
  },
});
const upload = multer({ storage }); // to parse multipart/form-data

// routing with file storage------------------------------------------------------------------------------------------------


app.post("/checkAuth/register", upload.single("image"), Register); // for registering a new user , upload.single will upload a single file locally .
app.post("/posts", verifyToken, upload.single("image"), createPost); // for registering a new post, upload.single will upload a single file locally.

// connect to mongodb------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 5000; // to get the port of the server
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // use new url;
    useUnifiedTopology: true, // for using unified topology
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is at port : ${PORT}`));
  })
  .catch((error) => console.log(`${error} : did not connect`));
