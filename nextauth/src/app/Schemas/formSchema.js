import * as Yup from 'yup'

export const SignupSchema = Yup.object({
    username : Yup.string().min(2).max(25).required("Enter Your name"),
    email : Yup.string().email().required("Enter your email"),
    password : Yup.string().min(4).required("Enter your password"),
    confirmPassword : Yup.string().required().oneOf([Yup.ref("password"),null , "Password must match"])
})

export const LoginSchema = Yup.object({
    email : Yup.string().email().required("Enter your email"),
    password : Yup.string().min(4).required("Enter your password")
})