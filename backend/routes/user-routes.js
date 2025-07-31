import { Router } from "express";
// import { activateUser, createUser, deleteUserAddress, getUser, loginUser,logout,updateAvatar, updateUserAddresses, updateUserInfo, updateUserPassword } from "../controllers/user-controller.js";
import {registerUser, activateUser,loginUser,getUser,logoutUser,updateUserInfo,updateAvatar,updateUserPassword, registerShop, getShopDashboardData, getAdminDashboardData, getAllUsers} from "../controllers/user-controller.js";
import {upload} from "../middlewares/multer-middleware.js";
import { userLoginValidator, userRegisterValidator ,updateUserValidator,validatePasswordChange} from "../validators/user-validators.js";
import { validate } from "../validators/validate.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import isAuthorized from "../middlewares/isAuthorized.js";


const userRouter = Router()


userRouter.route("/register").post(upload.single("file") ,userRegisterValidator(),validate,registerUser);

userRouter.route("/activate").post(activateUser)

userRouter.route("/login").post(userLoginValidator(),validate,loginUser)

userRouter.route("/get").get(isAuthenticated, isAuthorized(["user","shop","admin"]), getUser)

userRouter.route("/logout").get(isAuthenticated, isAuthorized(["user","shop","admin"]),logoutUser)

userRouter.route("/avatar").put(isAuthenticated, isAuthorized(["user","shop","admin"]) ,upload.single("file"),updateAvatar)

userRouter.route("/update").put(isAuthenticated,isAuthorized(["user","shop","admin"]) ,updateUserValidator(),validate,updateUserInfo)

userRouter.route("/password").put(isAuthenticated,isAuthorized(["user","shop","admin"]) ,validatePasswordChange(),validate,updateUserPassword)

userRouter.route("/shop/register").put(isAuthenticated,isAuthorized(["user","shop","admin"]) ,updateUserValidator(),validate, registerShop)


userRouter.route("/shop/dashboard").get(isAuthenticated,isAuthorized(["shop"]) , getShopDashboardData)


userRouter.route("/admin/dashboard").get(isAuthenticated,isAuthorized(["admin","shop"]) , getAdminDashboardData)

userRouter.route("/admin/users").get(isAuthenticated,isAuthorized(["admin"]) ,getAllUsers)



// userRouter.route("/update-user-addresses").put(isAuthenticated,updateUserAddresses)
// userRouter.route("/delete-user-address/:id").delete(isAuthenticated,deleteUserAddress)

export default userRouter;
