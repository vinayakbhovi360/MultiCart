import { User } from "../models/user-model.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/jwtToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import path from "path";
import { Order } from "../models/order-model.js";
import { Product } from "../models/products-model.js";

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, name, password, address, phoneNumber, pinCode } = req.body;
  console.log(req.body);
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting file" });
      }
    });

    throw new ApiError(400, "User already exists");
  }
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }
  // const filename = req.file.filename;
  // const fileUrl = `${filename}`;

  const filename = req.file.filename;
  const filePath = path.join("./uploads", filename);
  let result;

  try {
    result = await uploadOnCloudinary(filePath);
  } catch (error) {
    console.log("Cloudinary upload failed:", error);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(
          "Error deleting local file after Cloudinary upload failed:",
          err
        );
      }
    });
    throw new ApiError(500, "File upload failed");
  }

  // fs.unlink(filePath, (err) => {
  //   if (err) console.log(err);
  // });

  console.log(result.secure_url);

  const user = {
    name,
    email,
    phoneNumber,
    password,
    pinCode,
    address,
    avatar: result.secure_url,
  };
  const activationToken = createActivationToken(user);
  const frontEnd_url = process.env.FRONTEND_URL;
  const activationUrl = `${frontEnd_url}/activation/${activationToken}`;

  await sendMail({
    email: user.email,
    subject: "Activate your user",
    message: `Hello ${user.name}, please click on the link to activate your user account : ${activationUrl}`,
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, activationUrl, activation_token: activationToken },
        "User registration successful. Please activate your account using the link provided in your email."
      )
    );
});

// Activate user
export const activateUser = asyncHandler(async (req, res) => {
  const { activation_token } = req.body;
  //   console.log(req.body);
  const newuser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
  if (!newuser) {
    throw new ApiError(400, "Invalid token");
  }
  const { name, email, password, avatar, address, phoneNumber, pinCode } =
    newuser;
  let user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User already exists");
  }

  user = await User.create({
    name,
    email,
    password,
    avatar,
    address,
    phoneNumber,
    pinCode,
  });
  sendToken(user, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please provide the all fields", []);
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(400, "user doesn't exists !", []);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Please provide the correct information ", []);
  }
  sendToken(user, 200, res);
});

export const getUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.id);
  if (!currentUser) {
    console.error("User not found");
    throw new ApiError(400, "User not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, { user: currentUser }, "User retrieved successfully")
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json(new ApiResponse(200, {}, "User logged out"));
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const existUser = await User.findById(req.id);
  console.log(req.file);

  if (req.file) {
    // Upload file to Cloudinary
    const filename = req.file.filename;
    const filePath = path.join("./uploads", filename);
    let result;

    try {
      result = await uploadOnCloudinary(filePath);
    } catch (error) {
      console.log("Cloudinary upload failed:", error);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(
            "Error deleting local file after Cloudinary upload failed:",
            err
          );
        }
      });
      throw new ApiError(500, "File upload failed");
    }

    // fs.unlink(filePath, (err) => {
    //   if (err) {
    //     console.log("Error deleting local file:", err);
    //   }
    // });

    existUser.avatar = result.secure_url;
    await existUser.save();

    //old
    // const fileUrl = `${req.file.filename}`;
    // existUser.avatar = fileUrl;
    // await existUser.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, { user: existUser }, "Avatar updated successfully")
      );
  } else {
    throw new ApiError(400, "No file uploaded");
  }
});

export const updateUserInfo = asyncHandler(async (req, res) => {
  const { email, phoneNumber, name, address } = req.body;
  const user = await User.findById(req.id);

  if (!user) {
    throw new ApiError("User not found", 400);
  }

  (user.name = name),
    (user.email = email),
    (user.phoneNumber = phoneNumber),
    (user.address = address);

  await user.save();

  res
    .status(201)
    .json(new ApiResponse(200, { user }, "User updated successfully"));
});

export const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id).select("+password");
  console.log(user);
  console.log(req.body, req.body.oldPassword);
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    throw new ApiError(400, "Old password is incorrect!");
  }
  console.log(isPasswordMatched);

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ApiError(400, "Password doesn't matched with each other!");
  }

  user.password = req.body.newPassword;
  await user.save();

  console.log("success");

  res
    .status(201)
    .json(new ApiResponse(200, { user }, "Password updated successfully"));
});

// export const updateUserAddresses = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);

//     const sameTypeAddress = user.addresses.find(
//       (address) => address.addressType === req.body.addressType
//     );

//     if(sameTypeAddress){
//       return next(
//         new ErrorHandler(`${req.body.addressType} already exists`, 400)
//       )
//     }
//     const existsAddress = user.addresses.find((address) => address._id === req.body._id)

//     if(existsAddress){
//       Object.assign(existsAddress,req.body)
//     }else{
//       user.addresses.push(req.body)
//     }
//     await user.save()

//     res.status(200).json({
//       success : true,
//       user,
//     })

//   } catch (error) {
//     return next (new ErrorHandler(error.message,500))
//   }
// });

// export const deleteUserAddress = catchAsyncErrors(async(req,res,next) => {
//   try{
//     // console.log(req)
//     const userId = req.user._id
//     const addressId = req.params.id
//     // console.log(req.params.id)

//     await User.updateOne(
//       { _id: userId },
//       {$pull : {addresses : {_id:addressId}}}

//     )
//     const user = await User.findById(userId)
//     res.status(200).json({success : true,user})

//   }catch(error){
//     return next (new ErrorHandler(error.message,500))
//   }
// })

export const registerShop = asyncHandler(async (req, res) => {
  console.log("i am here " + req.body);
  console.log(req.body);
  const { email, phoneNumber, name, address } = req.body;
  const user = await User.findById(req.id);

  if (!user) {
    throw new ApiError("User not found", 400);
  }

  (user.name = name),
    (user.email = email),
    (user.phoneNumber = phoneNumber),
    (user.address = address),
    (user.role = "shop");

  await user.save();

  res
    .status(201)
    .json(new ApiResponse(200, { user }, "Shop registered successfully"));
});

export const getShopDashboardData = asyncHandler(async (req, res, next) => {
  const shopId = req.id;
  console.log(req.id);

  try {
    const totalProducts = await Product.countDocuments({ userId: shopId });
    console.log(totalProducts);
    const totalOrders = await Order.countDocuments({ vanderUserId: shopId });
    console.log(totalOrders);
    const pendingOrders = await Order.countDocuments({
      vanderUserId: shopId,
      status: { $ne: "completed" },
    });
    const uniqueCustomers = await Order.distinct("userId", {
      vanderUserId: shopId,
    });

    if (!totalProducts && !totalOrders) {
      throw next(new ApiError(404, "Shop data not found"));
    }
    return res.status(200).json(
      new ApiResponse(200, {
        totalProducts,
        totalOrders,
        pendingOrders,
        uniqueCustomers: uniqueCustomers.length,
      })
    );
  } catch (error) {
    console.error("Error fetching shop dashboard data:", error);
    return next(
      new ApiError(500, "Server error while fetching shop dashboard data")
    );
  }
});

export const getAdminDashboardData = asyncHandler(async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    // Fetch total number of shops
    const totalShops = await User.countDocuments({ role: "shop" });

    // Fetch total number of orders
    const totalOrders = await Order.countDocuments();

    // Fetch total number of products
    const totalProducts = await Product.countDocuments();

    // Fetch total number of pending orders
    const pendingOrders = await Order.countDocuments({
      status: { $ne: "completed" },
    });

    // Return the dashboard data
    return res.status(200).json(
      new ApiResponse(200, {
        totalUsers,
        totalShops,
        totalOrders,
        totalProducts,
        pendingOrders,
      })
    );
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    throw new ApiError(500, "Server error while fetching admin dashboard data");
  }
});

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    throw new ApiError("No users found", 404);
  }

  res
    .status(200)
    .json(new ApiResponse(200, { users }, "Users fetched successfully"));
});
