import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server";
interface RequestBody  {
    username: string
    password: string
}
export const POST = async(req: Request)=>{
    //console.log("log in...");
    
    const body: RequestBody  = await req.json();
    //find user
    const user = await prisma.user.findFirst({
        where:{
            email: body.username,
        }
    });
    console.log("log in user: ",user)
    //compare() compares suppplied password which hashed first to the already hashed used password in DB
    if(user && (await bcrypt.compare(body.password, user.password))){
        const {password, ...userDataWithoutPassword} = user;
        return new Response(JSON.stringify(userDataWithoutPassword))
    }
    else return new Response(JSON.stringify(null))
    
}