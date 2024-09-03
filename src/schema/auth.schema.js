import * as Yup from 'yup';

export const loginSchema = Yup.object({
 
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .matches(/[A-Z]/, 'Must contain at least one capital letter')
    .required('Required'),
})