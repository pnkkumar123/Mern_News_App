import mongoose from "mongoose";

const crypto = new mongoose.Schema({
    createdAt:{type:Date},


description:{type:String},


thumbnail:{type:String},


title:{type:String},


url:{type:String}


},{timestamps:true})

const Crypto = mongoose.model("Crypto", crypto)

export default Crypto