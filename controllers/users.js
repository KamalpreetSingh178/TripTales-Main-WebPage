//Controller-For Logic of Users
import User from "../models/User.js";

/* Read */
//getUser functionality
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;//Grabbing the ID from request Parameters like query string where we grab ID from particular string
    const user = await User.findById(id);//Using ID to grab the Information of User we need
    res.status(200).json(user);//Sending User Info back to the Frontend after finding the User
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//getUserFriends functionality
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    //Finding friends
    const friends = await Promise.all(//Promise.all as we will make multiple API Calls to the Database
      user.friends.map((id) => User.findById(id))//Grabbing each ID the User has and grabbing all the Information from the Friends ID's
    );
    const formattedFriends = friends.map(//Formatting it in form for the Frontend
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {//Grabbing the Parameters
        return { _id, firstName, lastName, occupation, location, picturePath };//Returning the grabbed things as an Object
      }
    );
    res.status(200).json(formattedFriends);//Sending to the Frontend
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Update */
//Add Remove Friend Functionality
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;//Grabbing UserID and FriendID
    const user = await User.findById(id);//Finding Current User
    const friend = await User.findById(friendId);//Finding Friend

    if (user.friends.includes(friendId)) {//If Friend Id is included in Current User Friends ID's-Means he wants to remove it
        //As he is already his Friend-So He can't add him again-So it simply means he wants to remove him
      user.friends = user.friends.filter((id) => id !== friendId);//filter function copies element when the condition id!==friendId is fulfilled
      friend.friends = friend.friends.filter((id) => id !== id);//Removing User from the Friend's list
    } else {//If Friend is not in Friend List of Current User
      user.friends.push(friendId);//Adding Friend to Friend of Current User
      friend.friends.push(id);//Adding User to Friend list of the Friend
    }//One adds-Friend is added in both of their list
    //One removes the Other-Both are removed from each other list
    await user.save();//Saving the updated list
    await friend.save();

    const friends = await Promise.all(//Finding the Friend from their ID
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(//Formatting friends for the Frontend
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};