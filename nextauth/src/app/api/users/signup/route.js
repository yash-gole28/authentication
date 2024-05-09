import { connect } from "@/app/dbConfig/dbConfig";
import userModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

connect()

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json()
        const { username, email, password } = reqBody
        const name = await userModel.findOne({ username })
        if (name) {
            return NextResponse.json({ error: "userName already exists" ,status: 400 })
        }

        const user = await userModel.findOne({ email })
        if (user) {
            return NextResponse.json({ error: `user already exists with email ${email}` ,status: 400 })
        }
       
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        // console.log(savedUser)

        return NextResponse.json({ message: 'user created', status: 200, savedUser })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}