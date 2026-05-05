import exp from 'express';
import { userModel } from '../models/mainModels.js';
import jwt from 'jsonwebtoken'

export const commonAPP = exp.Router()

// commonAPP.post("/login", async (request, response) => {
//     const {gmail , password} = request.body
    
// })

// commonAPP.post("/logout")

// commonAPP.put("/register")


// commonAPP.get("/check-auth", verifyToken("MEMBER"), (request, response) => {
//     response.status(200).json({
//         message: "authenticated",
//         payload: request.user,
//     });
// });