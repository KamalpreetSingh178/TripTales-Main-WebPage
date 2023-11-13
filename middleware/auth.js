import jwt from "jsonwebtoken";

//Authorization-Allow logged in users to hit API endpoints which are not allowed to non-logged in users
export const verifyToken = async (req, res, next) => {//Optional parameter next will allow us to have the function continue
  try {
    let token = req.header("Authorization");//From the request from the Frontend-Grabbing the Authorization header
    //And that token will be set on the Frontend that is Frontend will set it and we will grab it in Backend through this key

    if (!token) {//Token does not exists
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {//Bearer Token or Bearer string
      token = token.slice(7, token.length).trimLeft();//Taking the token after the text Bearer
      //token will be placed after the Bearer
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);//Checking Token with JWT
    req.user = verified;//User being verified
    next();//For Middleware,next function will let it to proceed to the next step of the function
  } catch (err) {
    res.status(500).json({ error: err.message });
  }//Verify Token will be used to verify when Logging In not when Registering
  /*Say to verify while registering, we will keep it before the last logic-
  app.post("/auth/register", upload.single("picture"), verifyToken, register); */
};