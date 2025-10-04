import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus  from 'http-status-codes';
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { createUserToken } from "../../utils/userToken";



const credentialsLogin = async ({ email, password }: { email: string, password: string }) => {

    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

      if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")
    }

      const userTokens = createUserToken(isUserExist)

      const { password: pass, ...rest } = isUserExist

       return {
         accessToken: userTokens.accessToken,
        user: rest
    }

   
}

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data
        })
    }

    return user;
}


export const AuthService = {
   credentialsLogin,
   authWithGoogle
}