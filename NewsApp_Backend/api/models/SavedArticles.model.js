import mongoose from 'mongoose';

const ForexSchema = new mongoose.Schema({
    article_photo_url: {
        type : String,
    },
    article_title : {
        type: String,
    },
    article_url: {
        type: String,
    },
    source: {
        type: String,
    },

},{timestamps:true});
const CryptoSchema = new mongoose.Schema({
    createdAt: {
        type: String,
    },
    description: {
        type: String,
    },
    thumbnail : {
        type: String,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
},{timestamps : true});
const WorldSchema = new mongoose.Schema({
      author : {
        type: String,
    },
    content: {
        type: String,
    },
    description:{
        type: String,
    },
    publishedAt: {
        type: String,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    urlToImage: {
        type: String,
    },
},{timestamps:true});

const combinedSchema = new mongoose.Schema({
    api1: ForexSchema,
    api2: CryptoSchema,
    api3: WorldSchema,
});
const SavedArticles =  new mongoose.model('savedArticles',combinedSchema);
export default SavedArticles;

