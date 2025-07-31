export const runClientValidations = (formData) => {
  const clientErrors = {};
  console.log(formData);

  // Validate 'name'
  if ("name" in formData && !formData.name) {
    clientErrors.name = "Name cannot be empty.";
  }

  // Validate 'email'
  if ("email" in formData) {
    if (!formData.email) {
      clientErrors.email = "Email cannot be empty.";
    }
    // else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //     clientErrors.email = "Please enter a valid email address.";
    // }
  }

  // Validate 'phoneNumber'
  if ("phoneNumber" in formData) {
    if (!formData.phoneNumber) {
      clientErrors.phoneNumber = "Phone number cannot be empty.";
    } else if (String(formData.phoneNumber).length !== 10) {
      clientErrors.phoneNumber = "Phone number must have at least 10 digits.";
    }
  }

  // Validate 'address'
  if ("address" in formData && !formData.address) {
    clientErrors.address = "Address cannot be empty.";
  }

  // Validate 'pinCode'
  if ("pinCode" in formData) {
    if (!formData.pinCode) {
      clientErrors.pinCode = "Pin code cannot be empty.";
    } else if (String(formData.pinCode).length !== 6) {
      clientErrors.pinCode = "Pin code must be exactly 6 digits.";
    }
  }

  // Validate 'password'
  if ("password" in formData) {
    if (!formData.password) {
      clientErrors.password = "Password cannot be empty.";
    } else if (formData.password.length < 6) {
      clientErrors.password = "Password must be at least 6 characters long.";
    }
  }

  // Validate 'oldPassword'
  if ("oldPassword" in formData) {
    if (!formData.oldPassword) {
      clientErrors.oldPassword = "Old password cannot be empty.";
    }
  }

  // Validate 'newPassword'
  if ("newPassword" in formData) {
    if (!formData.newPassword) {
      clientErrors.newPassword = "New password cannot be empty.";
    } else if (formData.newPassword.length < 6) {
      clientErrors.newPassword =
        "New password must be at least 6 characters long.";
    }
  }

  // Validate 'confirmPassword'
  if ("confirmPassword" in formData) {
    if (!formData.confirmPassword) {
      clientErrors.confirmPassword = "Confirm password cannot be empty.";
    } else if (formData.confirmPassword !== formData.newPassword) {
      clientErrors.confirmPassword =
        "Confirm password must match the new password.";
    }
  }

  // Validate 'aboutProduct'
  if ("aboutProduct" in formData) {
    if (!formData.aboutProduct) {
      clientErrors.aboutProduct = "About Product cannot be empty.";
    }
  }

  // Validate 'category'
  if ("category" in formData) {
    if (!formData.category || formData.category === "Choose a category") {
      clientErrors.category = "Please select a valid category.";
    }
  }

  // Validate 'originalPrice'
  if ("originalPrice" in formData) {
    if (!formData.originalPrice) {
      clientErrors.originalPrice = "Original price cannot be empty.";
    } else if (isNaN(formData.originalPrice) || formData.originalPrice <= 0) {
      clientErrors.originalPrice =
        "Original price must be a valid positive number.";
    }
  }

  console.log(clientErrors);

  return clientErrors;
};
