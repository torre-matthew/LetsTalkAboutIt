let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new article Schema object

var ArticleSchema = new Schema({
    articleTitle: {
        type: String,
        unique: true,
        required: "Article Title is required"
    },
    articleUrl: {
        type: String,
        required: "Article URL is required"
    },
    
    hasComments: Boolean,
    comments: [
        {
            commbody: String 
        }
    ]
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;