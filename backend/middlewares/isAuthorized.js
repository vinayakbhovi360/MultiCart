// hof - when a function accepts function as argument and/ or return a function as a value.

import { ApiError } from "../utils/ApiError.js"

const isAuthorized = (premittedRoles) => {
    return (req,res,next) => {
        if(premittedRoles.includes(req.role)){
            next()
        }else{
            // return res.status(403).json({
            //     errors:"you dont have access to the page"
            // })
            throw new ApiError(403, "you dont have access to the page",[])
        }
    }
}

export default isAuthorized