

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

const getAllUser = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
            posts: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
       const totalUsers = await prisma.user.count();

    return {
        data: result,
        totalUser: totalUsers
       
    }  
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            posts: true
        }
    })
    return result;
}

const updateUser = async (id: number, payload: Partial<User>) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result;
}

export const UserService = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,

   
}

