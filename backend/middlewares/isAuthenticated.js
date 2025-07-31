// import { User } from "../models/user-model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Authentication for general users
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  // console.log(req);
  console.log(req.cookies);
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Please login to continue");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  // req.user = await User.findById(decoded.id);
  req.id = decoded.id;
  req.role = decoded.role;

  // if (!req.user) {
  //   throw new ApiError(401, "User not found");
  // }

  next();
});

// import jwt from "jsonwebtoken"

// const authenticateUser = (req,res,next) => {
//     const token = req.headers["authorization"]
//     if(!token){
//         return res.status(401).json({error:"token is required"})
//     }
//     try{
//         const tokenData = jwt.verify(token,process.env.JWT_SECRET)
//         console.log("td",tokenData)
//         req.userId = tokenData.userId
//         req.role = tokenData.role
//         next()
//     }catch(err){
//         return res.status(401).json({error:err.message})
//     }
// }

// export default authenticateUser

// Authentication for sellers
// export const isSeller = asyncHandler(async (req, res, next) => {
//   const { seller_token } = req.cookies;

//   if (!seller_token) {
//     throw new ApiError(401, "Please login to continue");
//   }

//   const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
//   req.seller = await Shop.findById(decoded.id);

//   if (!req.seller) {
//     throw new ApiError(401, "Seller not found");
//   }

//   next();
// });

// Authorization for admin roles
export const isAdmin = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `${req.user.role} cannot access this resource!`);
    }
    next();
  });
};
