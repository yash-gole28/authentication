"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import React from 'react'
import { SignupSchema } from '../Schemas/formSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'


const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const page = () => {
    const router = useRouter()
    const {toast} = useToast()
    const { values , errors ,touched, handleBlur , handleChange , handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: async(values) => {
           try{
            const response = await axios.post("/api/users/signup",values)
            if(response.data.status === 200){
                console.log( "Signup success", response.data)
                router.push("/login")
            }else{
                toast({
                    variant: "destructive",
                    title: "Alert !",
                    description: response.data.error,
                  })
            }
           
           }catch(error){
            console.log(error)
           
           }
           
        }
    })
    // console.log(formik)
    return (
        <div className=' flex justify-center flex-col items-center min-h-screen max-w-screen'>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                    <Label htmlFor="picture">Username</Label>
                    <Input id="username" autoComplete = "off" type="text" name='username' values={values.username} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.username && touched.username ? <p>{errors.username}</p> : null }
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                    <Label htmlFor="picture">Email</Label>
                    <Input id="email" autoComplete = "off" type="email" name='email' values={values.email} onChange={handleChange} onBlur={handleBlur} />
                    {errors.email && touched.email ? <p>{errors.email}</p> : null }
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                    <Label htmlFor="picture">password</Label>
                    <Input id="password" autoComplete = "off" type="password" name='password' values={values.password} onChange={handleChange} onBlur={handleBlur} />
                    {errors.password && touched.password ? <p>{errors.password}</p> : null }
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Confirm password</Label>
                    <Input id="confirmPassword" autoComplete = "off" type="password" name='confirmPassword' values={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                    {errors.confirmPassword && touched.confirmPassword ? <p>{errors.confirmPassword}</p> : null }
                </div>
                <div className="flex justify-between items-center mr-16 mt-10 w-80">

                    <Button className=" m-8"> reset </Button>
                    <Button type='submit' className=" m-8"> Submit </Button>
                </div>
            </form>
        </div>
    )
}

export default page
