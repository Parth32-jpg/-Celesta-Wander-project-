const Celestia = require("../models/listing.js");

module.exports.index = async (req, res) => {
  // Celestia.find({}).then((res) => console.log(res));
  const allListing = await Celestia.find({});
  res.render("listings/all_list.ejs", { allListing });
};

module.exports.newlistingform = async (req, res) => {
  res.render("listings/new_form.ejs");
};

module.exports.readListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Celestia.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  //for login middleware
  if (!listing) {
    req.flash("error", "Listing data does not exist");
    res.redirect("/listing");
  }
  res.render("listings/read.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  //let listing = req.body.listing;
  const myList = new Celestia(req.body.listing);
  myList.owner = req.user._id;
  myList.image = { url, filename };
  await myList.save();
  console.log(myList);
  req.flash("success", "Congrats! New list data added");
  res.redirect("/listing");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Celestia.findById(id);
  if (!listing) {
    req.flash("error", "Listing requested data does not exist");
    res.redirect("/listing");
  }
  req.flash("success", "Congrats! data is edit");
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Celestia.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Congrats! Data updated");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Celestia.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Congrats! Data is deleted");
  res.redirect("/listing");
};
