const express = require("express");
const app = express();
const port = 3000;
const user = require("./adding.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));
app.use("/user",user);

//SENDING COOKIES
app.get("/" , (req,res) => {
    res.cookie("Greet" , "namaste", {signed : true});
    res.cookie("How are you" , "Doing well");
    res.send("working");
});
app.get("/random", (req, res) => {
    // Do something with the signed cookies on the server side
    console.log("Signed Cookies:", req.signedCookies);

    // Respond to the client without sending the cookie values
    res.send("random cookie");
});

// app.get("/random", (req,res) => {
//     res.send(req.signedCookies);
//     console.log(req.signedCookies);
//     //res.send("random cookie");
// })

app.listen(port , () => {
    console.log(`lisen port no ${port}`);
})