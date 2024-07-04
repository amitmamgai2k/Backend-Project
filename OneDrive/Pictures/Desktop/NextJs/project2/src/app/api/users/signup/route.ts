import { Connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse} from 'next/server';
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";



Connect()

export async function POST (request:NextRequest){
             try {
                const reqBody = request.json()
                const {username,email,password} = reqBody
                console.log(reqBody);

               const user  =  await User.findOne({email})
               if(user){
                 return NextResponse.json({
                    error:"User with this email already exist",
                    status:400
                 })
               }
               //encrypt user password
               var salt = await bcryptjs.genSaltSync(10);
               const hashedPassword = await bcryptjs.hash(password,salt);
               const newUser  = new user({
                               username,
                               email,
                                password:hashedPassword
                              })
           const savedUser =  await newUser.save()
           console.log(savedUser);

           // send verification email
         await sendEmail({email,emailType: "VERIFY",userId:savedUser._id})
         return NextResponse.json({
            message:"USER registered successfully",
            success:true,
            savedUser
         })
           
                
             } catch (error:any) {
               return NextResponse.json({error:error.message},
                {status:500}
               )
                
             }
}


