

import type { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"



const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {

  const { email, password, ...rest } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });

  if (isUserExist) {
     throw new AppError(httpStatus.BAD_REQUEST, "User Alrader Exist")
  
  }

  
  const hashedPassword = await bcrypt.hash(password as string, Number(process.env.BCRYPT_SALT_ROUND));


  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      ...rest,
    }
  });

  return createdUser;
};


export const UserService = {
    createUser,
   
}

