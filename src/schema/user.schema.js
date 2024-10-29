import * as yup from "yup";
const accessToken = localStorage.getItem("accessToken") || null;


// Register schema to concaitnate if not acessToken
export const registerSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character")
    .required("Required"),
  repeat_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
// Base schema (fields required for all types)
export const billingBase = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s-]{7,15}$/, "Please enter a valid phone number")
    .required("Contact number is required"),
});

// Conditionally concatenate schemas
export const billingSchema = billingBase

// Schemas for specific types
export const companySchema = billingSchema.concat(
  yup.object().shape({
    companyName: yup.string().required("Company Name is required"), 
    address: yup.string().required("Company Address is required"),
    VAT: yup
    .string()
    .matches(
      /^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|(ES)?[A-Z0-9][0-9]{7}[A-Z0-9]|(FI)?[0-9]{8}|(FR)?[A-Z0-9]{2}[0-9]{9}|(HR)?[0-9]{11}|(HU)?[0-9]{8}|(IE)?[0-9]{7}[A-Z0-9]{1,2}|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/,
      "Enter a valid European VAT number"
    )
    .required("VAT is required"),
    postcode: yup
    .string()
    .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid postcode")
    .required("Postcode is required"),
    country: yup.string().required("Country is required"),
    municipality: yup.string().required("Municipality is required"),
  })
);

export const individualSchema = billingSchema.concat(
  yup.object().shape({
    individualId: yup.string().required("Individual ID is required"),
    postcode: yup
    .string()
    .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid postcode")
    .required("Postcode is required"),
    country: yup.string().required("Country is required"),
    address: yup.string().required("Company Address is required"),
    municipality: yup.string().required("Municipality is required"),
  })
);

export const selfEmployedSchema = billingSchema.concat(
  yup.object().shape({ 
    municipality: yup.string().required("Municipality is required"),
    address: yup.string().required("Company Address is required"),
    postcode: yup
    .string()
    .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid postcode")
    .required("Postcode is required"),    
    country: yup.string().required("Country is required"),
  })
);
