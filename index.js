const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/userRoute");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");
const { connectDB } = require("./config/db");
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files from public directory
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/",staticRoute);
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at Port: ${PORT}`);
  });
});
