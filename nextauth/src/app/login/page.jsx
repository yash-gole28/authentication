'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { LoginSchema } from '../Schemas/formSchema'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'


const initialValues = { 
  email: "",
  password: ""
}
const login = () => {
  
  const { toast } = useToast()
  const router = useRouter()
  const { values ,resetForm , errors ,touched, handleBlur , handleChange , handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit:async (values) => {
       try{
        const response = await axios.post('/api/users/login',values)
        if(response.data.status === 200){
          console.log(response.data.status)
          localStorage.setItem("My-token",JSON.stringify(response.data.tokenData))
          toast({
            variant: "default",
            title: "Welcome",
            description: "Successfully logged in",
          })
          router.push('/')
        }else{
          toast({
            variant: "destructive",
            title: "Alert !",
            description: "Wrong email or password",
          })
        }
       
       }catch(error){
        console.log(error)
       }
    }
})


  return (
    <div className=' flex justify-center flex-col items-center min-h-screen max-w-screen to'>
            <form onSubmit={handleSubmit}>
               
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                    <Label htmlFor="picture">Email</Label>
                    <Input id="picture" autoComplete = "off" type="email" name='email' values={values.email} onChange={handleChange} onBlur={handleBlur} />
                    {errors.email && touched.email ? <p>{errors.email}</p> : null }
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
                    <Label htmlFor="picture">password</Label>
                    <Input id="picture" autoComplete = "off" type="password" name='password' values={values.password} onChange={handleChange} onBlur={handleBlur} />
                    {errors.password && touched.password ? <p>{errors.password}</p> : null }
                </div>
               
                <div className="flex justify-between items-center mr-16 mt-10 w-80">

                    {/* <Button className=" m-8"> reset </Button> */}
                    <Button type='submit' className=" m-8"> Submit </Button>
                </div>
            </form>
        </div>
  )
}

export default login
