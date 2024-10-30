const mongoose = require("mongoose");
const MOONGOSE_URL = "mongodb://127.0.0.1:27017/CelestiaWander_main";
const Data = require("./data.js");
const Celestia = require("../models/listing.js");

main()
  .then(() => console.log("my website is working"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MOONGOSE_URL);
}

const initDB = async () => {
  await Celestia.deleteMany();
  Data.data = Data.data.map((obj) => ({
    ...obj,
    owner: "65bf6b2511075d0c65f43fb3",
  }));
  let result = await Celestia.insertMany(Data.data);
  console.log(result);
  console.log("hogya kaam");
};
initDB();
