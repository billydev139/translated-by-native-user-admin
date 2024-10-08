import * as Yup from 'yup';

export const loginSchema = Yup.object({
 
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .matches(/[A-Z]/, 'Must contain at least one capital letter')
    .required('Required'),
})

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export const sendPasswordReset = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Must be at least 6 characters')
  .matches(/[A-Z]/, 'Must contain at least one capital letter')
  .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});
