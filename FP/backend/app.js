const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");
const uploadRouter = require("./routes/upload");
const fs = require("fs");

if (!fs.existsSync("assets/pics/")) {
  fs.mkdirSync("assets/pics/", { recursive: true });
}
mongoose.connect(
  "mongodb+srv://Tewodros12:tma263510@cluster0.hd3fj.mongodb.net/product?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log("DB error", err);
    } else {
      console.log("DB connected");
    }
  }
);

app.use("/pictures", express.static("assets/pics/"));
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); //allow access
  },
};
//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use("/products", productRouter);
app.use("/upload", uploadRouter);
app.use("/payments", paymentRouter);
app.use("/carts", cartRouter);
app.use("/users", userRouter);

//error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(404).send(err);
  } else {
    next();
  }
});
const port = process.env.PORT || 3000;
app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Server running on port 3000.....");
});
