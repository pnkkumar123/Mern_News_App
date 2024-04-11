import { Timestamp } from "mongodb";
import mongoose, { Schema } from "mongoose";

const Forex = new Schema({
    article_photo_url : {type:String},


article_title:{type:String},


article_url:{type:String},


post_time_utc:{type:Date},


source:{type:String}


},{Timestamp:true});

const forex = mongoose.model('forex',Forex);

export default forex;