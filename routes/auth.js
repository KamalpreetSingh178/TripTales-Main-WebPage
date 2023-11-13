//This is where we create our Route
import express from "express";
import { login } from "../controllers/auth.js";//Importing Controller for Login Functionality

//Setting up our Router
const router = express.Router();
//This allows Express to identify that these Routes are all configured,so we can keep them in separate files

//Instead of app.use, we will use router.post()
router.post("/login", login);

export default router;