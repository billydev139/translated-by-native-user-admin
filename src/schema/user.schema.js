import * as yup from 'yup';

const userSchema = yup.object({
    username: yup.string().matches(/^\S*$/, "Username cannot contain spaces").required("Username is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    role: yup.string().required("Role is required"),
  })

const editUserSchema = yup.object({
  
  username: yup.string().matches(/^\S*$/, "Username cannot contain spaces").required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  // PhoneNo: yup.number()
    // .typeError("Phone Number must be a number")
    // .required("Phone Number is required"),
  })

export {userSchema, editUserSchema};
