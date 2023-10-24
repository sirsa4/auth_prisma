import { prisma } from "@/lib/prisma"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"
type RequestBody = {
    name: string
    email: string
    password: string
}
export const POST = async(req: Request)=>{
    const body: RequestBody = await req.json();
   // console.log("hello");
    
   // console.log(body)
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password,10)
        }
    });
    console.log("in user")
    const {password, ...result} = user;
  
    return new Response(JSON.stringify(result));
}   