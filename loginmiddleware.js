const Celestia = require("./models/listing");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create new listing");
    res.redirect("/login");
  }
  next();
};

module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Celestia.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not owner of this listing");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  console.log(review);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not autor of this review");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
