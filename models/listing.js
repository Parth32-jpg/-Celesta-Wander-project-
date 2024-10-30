const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wanderschema = new mongoose.Schema({
  title: {
    type: String,
    requirde: true,
  },
  description: {
    type: String,
    requirde: true,
  },
  image: {
    url: String,
    filename: String,
  },
  // image: {
  //   type: String,
  //        default: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  //   Set: (v) =>
  //   v === ""
  //   ? "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  //   : v,
  // },
  price: {
    type: Number,
    min: 0,
    requirde: true,
  },
  location: {
    type: String,
    requirde: true,
  },
  country: {
    type: String,
    requirde: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Celestia = mongoose.model("Celestia", wanderschema);
module.exports = Celestia;
