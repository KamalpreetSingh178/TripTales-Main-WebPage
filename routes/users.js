import express from "express";
//User Routes to see other People Profiles,see friends and route to add and remove Friends
import {
  getUser,//Controllers we need to create Later
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";//Verify Token for Verification

const router = express.Router();

/*Read Routes-Routes where we grab Informations But don't make any changes to the Database*/
router.get("/:id", verifyToken, getUser);
/*This Syntax represents that we have created this route as- app.use("/users",userRoutes);
So Finally link becomes- /users/:id ':id'-Means Some ID of the User-Calling Database with the ID returned by Frontend
This is a query string*/
router.get("/:id/friends", verifyToken, getUserFriends);//Grab the User Friends

/* Update */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);//For Updation-We use patch function instead
//We need Id of current user and Id of Friend we wish to add

export default router;