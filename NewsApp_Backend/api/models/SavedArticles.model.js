import mongoose from 'mongoose';

const ForexSchema = new mongoose.Schema({
    article_photo_url: {
        type : String,
        unique: true,
    },
    article_title : {
        type: String,
        unique: true,
    },
    article_url: {
        type: String,
        unique: true,
    },
    source: {
        type: String,
        unique: true,
    },

},{timestamps:true});
const CryptoSchema = new mongoose.Schema({
    createdAt: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        unique: true,
    },
    thumbnail : {
        type: String,
        unique: true,
    },
    title: {
        type: String,
        unique: true,
    },
    url: {
        type: String,
        unique: true,
    },
},{timestamps : true});
const WorldSchema = new mongoose.Schema({
    author: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    source: {
        id: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
    },
    title: {
        type: String,
        default: null,
    },
    url: {
        type: String,
        default: null,
    },
    urlToImage: {
        type: String,
        default: null,
    },
}, { timestamps: true });



const combinedSchema = new mongoose.Schema({
    api1: ForexSchema,
    api2: CryptoSchema,
    api3: WorldSchema,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true,
    },
});
const SavedArticles =  new mongoose.model('savedArticles',combinedSchema);
export default SavedArticles;

