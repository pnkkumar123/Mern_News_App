import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    author: { type: String, default: null },
    content: { type: String, default: null },
    description: { type: String, default: null },
    publishedAt: { type: Date, default: null },
    source: { id: { type: String, default: null }, name: { type: String, default: null } },
    title: { type: String, default: null },
    url: { type: String, required: true,default:null },
    urlToImage: { type: String, default: null }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;


