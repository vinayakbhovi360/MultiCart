// creating token and saving that in cookies

import { ApiResponse } from "./ApiResponse.js"
export const sendToken = (user,statusCode,res) =>{
    const token = user.getJwtToken()

    // options for cookies
    const options = {
        expires : new Date(Date.now() + 7 * 24 * 60* 60 * 1000),
        httpOnly : true,
        sameSite : "none",
        secure : true,
    }

    // res.status(statusCode).cookie("token",token, options).json({
    //     success : true,
    //     user,
    //     token,
    // })

    return res
    .status(statusCode)
    .cookie("token",token, options)
    .json(
        new ApiResponse(
            statusCode,
            {user,token},
            "User logged in successfully"
        ))

    }