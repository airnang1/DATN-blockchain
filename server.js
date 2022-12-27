const express = require("express");
const app = express();
const mongoose = require("mongoose");
const paypal = require("paypal-rest-sdk");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const productsRoute = require("./routes/products.js");
const inputFieldRoute = require("./routes/inputFieldConfigProduct.js");
const imgLogoFieldRoute = require("./routes/imageLogoField.js");
const selectFieldRoute = require("./routes/selectField.js");
const cartRoute = require("./routes/cart.js");
const commentRoute = require("./routes/comment.js");
const searchRoute = require("./routes/search.js");
const categoryRoute = require("./routes/category.js");
const userAddressRoute = require("./routes/userAddress.js");
const paymentRoute = require("./routes/payment.js");
const orderRoute = require("./routes/order.js");
const path = require("path");

const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
dotenv.config();

paypal.configure({
  mode: "sandbox",
  client_id:
    "AZU-WEDM-F1OZ0P4WasT4a-HzcvfmhwffXXukQJqKEd6LysONXMW-O8z7oTPKgGkg0zONh-mkA5YumFL",
  client_secret:
    "EBmpfnknSWl2MmTFoUPXJoUOoibPB7xM79-EKrBaga-SmTfloKmsoUJM36OW-zBARbipVNFS6rAPB_90",
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.error(
      "Failed to connect to the database on startup - retrying in 5 sec",
      err
    );
  });

//middleware

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//mail sender detail
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV !== "production"
      ? ["http://localhost:1901"]
      : ["https://buihoanglong19012001.netlify.app/"]
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/input-field", inputFieldRoute);
app.use("/api/select-field", selectFieldRoute);
app.use("/api/logo-field", imgLogoFieldRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/comment", commentRoute);
app.use("/api/search", searchRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user-address", userAddressRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../web-ban-hang/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "web-ban-hang", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("api in running ...");
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running with Port ${process.env.PORT}`);
});
