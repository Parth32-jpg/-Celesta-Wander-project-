const express = require("express");
const router = express.Router({ mergeParams: true });
const Celestia = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewschema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../loginmiddleware.js");
const expressError = require("../utils/expressError.js");

const reviewController = require("../controllers/review.js");

const validateReview = (req, res, next) => {
  let { error } = reviewschema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    //throw new ExpressError(400, errMsg);
    throw new expressError(400, errMsg);
  } else {
    next();
  }
};

//Review (Post route)
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.reviewPost)
);

//Review (delete route)
router.delete(
  "/:reviewId",
  isLoggedIn,
  //isReviewAuthor,
  wrapAsync(reviewController.deletePost)
);

module.exports = router;
