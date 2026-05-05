import exp from 'express';
import { userModel } from '../models/mainModels.js';
import jwt from 'jsonwebtoken'
import {hash,compare} from 'bcryptjs'

export const commonAPP = exp.Router()

    commonAPP.post("/login", async (req, res) => {

  //get user cred obj
  const { email, password } = req.body;
  //find user by email
  const user = await userModel.findOne({ email: email });
  //if user not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare password
  const passwordMatch = await compare(password, user.password);
  //if passwords not matched
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //create jwt
  const signedToken = sign(
    {
      id: user._id,
      email: email,
      firstname: user.firstname,
      lastname: user.lastname,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

//send res
  res.status(200).json({ message: "login success", payload: userObj });
});

// })

// commonAPP.post("/logout")
commonAPP.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  //send res
  res.status(200).json({ message: "Logout success" });
});

// commonAPP.put("/register")



// commonAPP.get("/check-auth", verifyToken("MEMBER"), (request, response) => {
//     response.status(200).json({
//         message: "authenticated",
//         payload: request.user,
//     });
// });