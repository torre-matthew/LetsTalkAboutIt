let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new article Schema object

var CommentsSchema = new Schema({
    commBody: String,
});

let Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;