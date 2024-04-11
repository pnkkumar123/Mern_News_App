import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    author: { type: String,  },
    content: { type: String,  },
    description: { type: String,  },
    publishedAt: { type: Date,  },
    source: { id: { type: String,  }, name: { type: String, } },
    title: { type: String,  },
    url: { type: String,  },
    urlToImage: { type: String,  }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;


