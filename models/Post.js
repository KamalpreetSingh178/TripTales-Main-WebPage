import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {//Passing in an Object
    userId: {//User who posted it-Reference we need
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,//Text in the post
    picturePath: String,
    userPicturePath: String,//Because we have a User Profile Image
    likes: {//likes- Object of who liked the Post
      type: Map,//A Map as that's how MongoDB saves it-Check Of User Id exists in this Map
      of: Boolean,//Value will always be true if the User ID exists in Map
    },//We can use Array of UserID but map is more efficient
    //As Map is a dictionary but for Array,we have to loop through to find a Person-O(1) Map vs O(N) Array
    comments: {//Comments-Array of Strings
      type: Array,
      default: [],//Default value will be an empty array 
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);//Mongoose Template

export default Post;