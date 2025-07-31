import { Product } from "../models/products-model.js";
import { User } from "../models/user-model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

export const createProduct = asyncHandler(async (req, res) => {
  const id = req.id;
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(400, "Shop not found");
  }

  if (!req.file) {
    throw new ApiError(400, "No file uploaded for your product");
  }

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
          console.log("Error deleting local file after Cloudinary upload failed:", err);
        }
      });
      throw new ApiError(500, "File upload failed");
    }
  
    // // Clean up local file after successful upload
    // fs.unlink(filePath, (err) => {
    //   if (err) {
    //     console.log("Error deleting local file:", err);
    //   }
    // });


  // old
  // const filename = req.file.filename;
  // const fileUrl = `${filename}`;

  const { name, aboutProduct, category, originalPrice } = req.body;

  const product = new Product({
    name,
    aboutProduct,
    category,
    originalPrice,
    image: result.secure_url,
    userId: user._id,
  });

  await product.save();

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

export const productsByShop = asyncHandler(async (req, res) => {
  const products = await Product.find({ userId: req.id });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products },
        "Products retrieved successfully of your shop"
      )
    );
});

// export const getAllProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find().sort({ createdAt: -1 });
//   res
//     .status(200)
//     .json(new ApiResponse(200, {products}, "Products fetched successfully"));
// })

// export const getAllProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find()
//     .populate("userId", "name");  

//   res.status(200).json(new ApiResponse(200, { products }, "Products fetched successfully"));
// });

// export const getAllProducts = asyncHandler(async (req, res) => {
//   const products = await Product.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         let: { userIdObj: { $toObjectId: "$userId" } },
//         pipeline: [
//           { $match: { $expr: { $eq: ["$_id", "$$userIdObj"] } } },
//           { $project: { name: 1, email: 1, shopName: 1 } },
//         ],
//         as: "user",
//       },
//     },
//     {
//       $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
//     },
//     {
//       $project: {
//         name: 1,
//         description: 1,
//         category: 1,
//         originalPrice: 1,
//         image: 1,
//         createdAt: 1,
//         "user.name": 1,
//         "user.email": 1,
//       },
//     },
//   ]);

//   // Send the response back to the client
//   res.status(200).json(new ApiResponse(200, { products }, "Products fetched successfully"));
// });

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user_details",
      },
    },
    {
      $addFields: {
        user_details: {
          $arrayElemAt: ["$user_details", 0],
        },
      },
    },
    {
      $project:{
        name: 1,
        aboutProduct: 1,
        category: 1,
        originalPrice: 1,
        image: 1,
        "user_details.name": 1,
        "user_details._id":1,
      }
    }
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, { products }, "Products fetched successfully"));
});


export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; 
    const product = await Product.findById(productId); 

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error, failed to fetch product' });
  }
};