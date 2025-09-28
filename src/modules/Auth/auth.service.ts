import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus  from 'http-status-codes';
import bcrypt from "bcrypt";


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

    //   if (!isPasswordMatched) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")
    // }

    //  const userTokens = creatUserToken(isUserExist)

    //   const { password: pass, ...rest } = isUserExist.toObject()

    //    return {
    //     accessToken: userTokens.accessToken,
    //     user: rest
    // }

    if (password === isUserExist.password) {
        return isPasswordMatched
    }
    else {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")
       
    }
}

export const AuthService = {
   credentialsLogin,
}