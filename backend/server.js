// npm install bcryptjs body-parser cookie-parser cors dotenv express express-validator jsonwebtoken mongoose multer nodemailer nodemon

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./db/Database.js";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/error-middleware.js";
// import {errorMiddleware} from "./middlewares/Error.js";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT;
const frontEnd_url = process.env.FRONTEND_URL;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [frontEnd_url],
    credentials: true,
  })
);
// app.use(cors({ credentials: true }));
// app.use(cors())
app.use("/", express.static("uploads"));
// app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

// // Handleing uncatched Exception
// process.on("uncaughtException",(err) =>{
//     console.log(`Error: ${err.message}`)
//     console.log(`shutting down the server for handling uncaught exception`)
// })

// import routes

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

import userRouter from "./routes/user-routes.js";
import productsRouts from "./routes/Products-routes.js";
import paymentRoutes from "./routes/payment-routes.js";
import orderRoutes from "./routes/order-routes.js";

app.use("/api/v2/user", userRouter);
app.use("/api/v2/product", productsRouts);
app.use("/api/v2/payment", paymentRoutes);
app.use("/api/v2/order", orderRoutes);

// console.log(process.env.RAZORPAY_KEY_ID)
// console.log(process.env.RAZORPAY_KEY_SECRET)

app.use("/api/v2/uploads", express.static(path.join(process.cwd(), "uploads")));

const server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// unhandle promise rejection
// process.on("unhandledRejection", (err) => {
//     console.log(`shutting down the server for ${err.message}`)
//     console.log("shutting down the server for unhandled promise rejection")
//     server.close(() => {
//         process.exit(1)
//     })
// })

// it is ErrorHandleing

app.use(errorHandler);
