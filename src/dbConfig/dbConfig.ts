import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB is connected sucessfully");
        });

        connection.on('error',(error:any)=>{
            console.log("Something went wrong!"+error);
            process.exit(1);
        })
    }catch(error:any){
        console.log(error);
        console.log("Something went wrong while connecting to DB");
    }
}