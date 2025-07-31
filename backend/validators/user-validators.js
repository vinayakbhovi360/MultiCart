import { body } from "express-validator";

const AvailableUserRoles = ["user", "vendor", "admin"];

export const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .toLowerCase()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("name")
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),

    body("password").trim().notEmpty().withMessage("Password is required"),

    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

export const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .toLowerCase(),

    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

export const updateUserValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is invalid")
      .toLowerCase(),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number cannot be empty")
      .isMobilePhone("en-IN")
      .withMessage("Phone number is invalid"),
  ];
};

export const validatePasswordChange = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password cannot be empty"),

    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Confirm password does not match new password");
      }
      return true;
    }),
  ];
};
