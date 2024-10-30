const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../loginmiddleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //INDEX ROUTE
  .post(
    isLoggedIn,
  upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  ); //Create Route
  // .post(upload.single("listing[image]") , (req,res) => {
  //   res.send(req.file)
  // })

//NEW ROUTE
router.get("/new", isLoggedIn, wrapAsync(listingController.newlistingform));

router
  .route("/:id")
  .get(wrapAsync(listingController.readListing)) //READ ROUTE
  .put(isLoggedIn, isOwner,upload.single("listing[image]"), wrapAsync(listingController.updateListing)) //Update Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); //Delete Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
