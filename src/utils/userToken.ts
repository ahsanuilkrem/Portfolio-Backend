// import {  Prisma, User } from "@prisma/client"

// export const creatUserToken = (user :Prisma.PostCreateInput): Promise<User> => {

//        const jwtPayload = {
    
//             id : user.id,
//             email : user.email,
//             role : user.role
//          }
    
//         const accessToken = generateToken(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES)
    


//         return {
//             accessToken
          
//         }

// } 

import { User } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";

// Define your token payload type
interface JwtPayload {
  id: Number;
  email: string;
  role: string;
}

// Generate the JWT
// const generateToken = (
//   payload: JwtPayload,
//   secret: string,
//   expiresIn: string
// ): string => {
//   return jwt.sign(payload, secret, { expiresIn });
// };

const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {

    const token = jwt.sign(payload, secret, {
        expiresIn
    } as SignOptions)
     return token
}

// Function to create a user token
export const createUserToken = (user: User): { accessToken: string } => {
  const jwtPayload: JwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET!,
    process.env.JWT_ACCESS_EXPIRES || "1h"
  );

  return {
    accessToken,
  };
};
