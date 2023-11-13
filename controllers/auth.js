import bcrypt from "bcrypt";//For password encryption
import jwt from "jsonwebtoken";//To create web tokens for User Authorization
import User from "../models/User.js";//User Model

/*Functionality for User to Register*/
export const register = async (req, res) => {//Asynchronous as we are calling Mongo Database 
    //And Call to Mongoose Database is asynchronous-It's essentially an API Call from Frontend to Backend and Backend to Database
    //req=Request Body we get from Frontend,res=Response provided to Frontend
    //req,res-Provided by default by ExpressJS
    try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;//Grabbing the Parameters from req.body
    //We are just structuring these parameters from the request body
    /*So From the Frontend we have to send an Object that has these Parameters or Arguments */

    const salt = await bcrypt.genSalt();//Creating Random Salt provided by bcrypt
    //And then use this salt to encrypt our Password
    const passwordHash = await bcrypt.hash(password, salt);//Using salt to hash the Password


    const newUser = new User({/*Passing an Object*/
      firstName,
      lastName,
      email,
      password: passwordHash,/*We won't be storing real password but password hash*/
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    });
    const savedUser = await newUser.save();//Saving the User
    res.status(201).json(savedUser);//res parameter provided by express
    //Status code 201 is provided if Successful operation-And create json version of savedUser
  } catch (err) {
    res.status(500).json({ error: err.message });//Status code of 500 sent to Frontend in case of errors
    //err.message-Error message whatever is returned by MongoDB Database
    /*Here our Frontend and Backend are using data in the same format
    IMPORTANT--> Mongo creates _id parameter for every data we create
    So on Registering-Under Network we can see the savedUser Parameters sent by Backend
    In MonogDatabase-In Browse Collections-Users -We can see the Registered User*/
  }
};

/* Setting up Login Function */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;//Grabbing Email and Password when user tries to log in-We have destructured them
    const user = await User.findOne({ email: email });//Using Monogoose to find list of Users with specified email
    if (!user) return res.status(400).json({ msg: "User does not exist" });//If User does not exists

    const isMatch = await bcrypt.compare(password, user.password);//Comparing Password entered by User and Password stored in Database
    //bcrypt will use the same salt on User entered Password and then compare by bcrypt.compare() method
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });//Password does not matches with Hash

    //jwt.sign({id:user._id})-Signing the token with User ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);//Creating JWT Token
    //Along with the User ID,we have passed a secret string from our ".env" file
    //JWT_SECRET is just a string saved in .env file
    delete user.password;//Deleting the Password so it doesn't get sent to the Frontend
    res.status(200).json({ token, user });
  } catch (err) {//Catch Block to catch errors
    res.status(500).json({ error: err.message });//We can also customize the error messages
  }
};