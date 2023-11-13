import Post from "../models/Post.js";
import User from "../models/User.js";

//Create Functions
export const createPost = async (req, res) => {//middleware handles the Picture
  try {
    const { userId, description, picturePath } = req.body;//Getting needed things for the Post from data sent by Frontend
    const user = await User.findById(userId);//Grabbing User Data
    const newPost = new Post({//Creating new Post in our Database
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,//User Profile Picture
      picturePath,//Post Picture Path
      likes: {},//Likes being starting with 0-likes:{"<Id value>:true"}-Format of likes Parameter
      comments: [],
    });
    await newPost.save();//Saving the Post in MongoDB

    const post = await Post.find();//Grabbing all the Posts to be returned to the Frontend
    //New updated list of Posts has to be sent to the Frontend
    res.status(201).json(post);//Returning the Post-201 means created Something with success
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* Read */
export const getFeedPosts = async (req, res) => {//Grab Posts of everyone
  try {
    const post = await Post.find();
    res.status(200).json(post);//200 is a Successful request
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {//Getting Posts posted by the current User
  try {
    const { userId } = req.params;//Grabbing UserID
    const post = await Post.find({ userId });//Grabbing Posts with userID of the Current User
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Update */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;//Grab the ID of the Post
    const { userId } = req.body;//Grab the User ID 
    const post = await Post.findById(id);//Getting the Post
    const isLiked = post.likes.get(userId);//Checking if Post has been liked

    if (isLiked) {//Post has been already liked-So Remove that like
      post.likes.delete(userId);//Object has keys as ID's
    } else {
      post.likes.set(userId, true);//Liking the Post
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }//We want a New Object
    );//Updating the Post from it's ID and it's new like count

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};