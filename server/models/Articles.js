const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticlesSchema = new Schema({
  title: String,
  body: String,
  author: String,
  tag: [String],
  comment: [{
    author: String,
    body: String,
    date: Date,
    upvotes: Number,
    downvotes: Number,
  }],
  upvotes: Number,
  downvotes: Number,
}, { timestamps: true });

ArticlesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    tag: this.tag,
    comment: this.comment,
    upvotes: this.upvotes,
    downvotes: this.downvotes,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Articles', ArticlesSchema);