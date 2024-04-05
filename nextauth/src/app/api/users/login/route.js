import { connect } from "@/app/dbConfig/dbConfig";
import userModel from "@/app/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

connect()

export async function POST(NextRequest){
    try{
        const reqBody = await NextRequest.json()
        const {email , password} = reqBody
        console.log(reqBody)

        const user =await userModel.findOne({email})

        if(!user){
            return NextResponse.json({error:"user does not exist",status : 400})
        }
        const validPassword = await bcrypt.compare(password , user.password)

        if(!validPassword){
            return NextResponse.json({error:"password does not match",status : 400})
        }

        const tokenData =await jwt.sign({id:user._id }, process.env.JWT_SECRET)
        console.log(tokenData)

        // localStorage.setItem("My-token",JSON.stringify(tokenData))
        return NextResponse.json({message:"logged in successfully" , status : 200 , tokenData})
    }catch(error){
        return NextResponse.json({error : error.message},{status:500})
    }
}