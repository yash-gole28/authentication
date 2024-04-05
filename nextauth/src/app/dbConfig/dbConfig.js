import mongoose from "mongoose";



export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;

        connection.on("connected" , ()=>{
            console.log("mongoDb connected successful")
        })
        connection.on('error', (err) => {
            console.log("an error occured " , err)
            process.exit()
        })
    }catch(error){

    }
}