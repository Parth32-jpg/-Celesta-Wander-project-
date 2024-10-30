const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

module.exports.reviewschema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

//   //DELETE REVIEWS IN DATABESE WHEN DELETE ANY LISTING(NO)
//   // module.exports.listingSchema.post("findOneAndDelete",async (listing) => {
//   //   if(listing){
//   //     await Review.deleteMany({_id:{$in:listing.reviews}});
//   //   }
//   // });

// const Listing = mongoose.model('Listing', listingSchema);
