import express from "express";
import { createProduct, getAllProducts, getProductById, productsByShop } from "../controllers/Products-controller.js";
import {upload} from "../middlewares/multer-middleware.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const productsRouts = express.Router();

productsRouts.route("/create").post(isAuthenticated,isAuthorized(["shop","admin"]) , upload.single("file"),createProduct)

productsRouts.route("/byshop").get(isAuthenticated, isAuthorized(["shop","admin"]), productsByShop)

productsRouts.route("/all").get(getAllProducts)

productsRouts.route("/:id").get(getProductById)

export default productsRouts