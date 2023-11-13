/*Importing Packages */
//"type":"module",->For Using import Statement in place of require Statements
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";

/*Importing Native Packages which come with Node already */
import path from "path";
import { fileURLToPath } from "url";
//To Set the Paths when we configure Directories-path and {fileURLToPath}

// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/*Configurations- Middleware and Packages Configuration*/
/*Middleware-Something that runs in between different things*/
const __filename = fileURLToPath(import.meta.url);//Grab the File URL
const __dirname = path.dirname(__filename);//To use the Folder Directory
dotenv.config();//Invoking to use dotenv files

//Invoking express application to use our Middleware
const app = express();
//Invoking stuff
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());//To Invoke our Cross Origin Resource Sharing Policies
app.use("/assets", express.static(path.join(__dirname, "public/assets")));//Setting Directory where we keep our Assests
//In this case,Assests will be the Images we will store
/*In Actual-We would want to store it in an actual storage file/directory or a Cloud Storage like S3 
For Now,we will be storing locally*/

/*Setting up File Storage Configurations*/
//Configurations from package Instructions-From Github Repository of Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {//Destination set as an function
    cb(null, "public/assets");//"public/assets"-Destination to save the file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });//To Upload the File and save it
//It will be the variable we will use to anytime upload a file

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

/*We will have Frontend at Port 3000 and Backend at Port 3001 */
/*Mongoose and MongoDB Setup*/
const PORT = process.env.PORT || 6001;//If 3001 Port doesn't works-Use Port 6001 as BackUp
mongoose.connect(process.env.MONGO_URL, {//mongoose.connect-Connecting to actual Database from the Node Server
    //And we will be using MONGO URL which we have created-In .env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {//Once Connected
    app.listen(PORT, () => console.log(`Server Port- ${PORT}`));//Callback Function to confirm Connection
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`));//Catching just in case of error

//To run the file before Integration- Use "node index.js"