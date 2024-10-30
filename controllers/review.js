const Celestia = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.reviewPost = async (req, res) => {
  console.log(req.params.id);
  let listing = await Celestia.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("new saved");
  req.flash("success", "Congrats! New Review Added");
  res.redirect(`/listing/${listing._id}`);
};

module.exports.deletePost = async (req, res) => {
  let { id, reviewId } = req.params;

  await Celestia.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted");
  res.redirect(`/listing/${id}`);
};
