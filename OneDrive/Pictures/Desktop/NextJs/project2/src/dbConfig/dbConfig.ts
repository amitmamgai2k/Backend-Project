import { error, log } from "console";
import mongoose from "mongoose";


export async function Connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('MonogoDB Connected');
            
        })
        connection.on('error',()=>{
            console.log('MonogoDB Connection error',error);
            process.exit
            
        })
        
    } catch (error) {
        console.log('Someting went wrong in connecting to DB',error);
        
    }
}