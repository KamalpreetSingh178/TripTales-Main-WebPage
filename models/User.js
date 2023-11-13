import mongoose from "mongoose";//To set up our Model

//Creating User Schema from Entity Relationship Diagram
const UserSchema = new mongoose.Schema(
  {/*We pass in an Object in mongoose.Schema
  And Set up Parameters*/
    firstName: {
      type: String,//Datatype of first name Parameter
      required: true,//It is an Required Parameter
      min: 2,//Minimum of 2 Characters are needed
      max: 50,//Maximum of 50 Characters are needed
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,//Can't have Duplicate emails
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,//friends is an Array as it will be a list
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }//Automatic dates when it is created/updated
);

const User = mongoose.model("User", UserSchema);//Creating a Mongoose Model from a Mongoose Schema
export default User;