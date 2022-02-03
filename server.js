const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("./routes/api/auth");
const ticket = require("./routes/api/ticket");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/auth", auth);
app.use("/api/ticket", ticket);

const port = process.env.PORT || 5008;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
