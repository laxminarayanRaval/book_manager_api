const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

bookSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  next();
});

module.exports = mongoose.model("Book", bookSchema);
