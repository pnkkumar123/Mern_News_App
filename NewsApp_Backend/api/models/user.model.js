import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    savedArticles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'SavedArticle',
    }],
},{timestamps:true})
const User = mongoose.model('User',userSchema);

export default User