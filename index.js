const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db-connect");

const productRoutes = require("./routes/product-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Online Store API is running"
    });
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);

connectDB();

app.listen(5000, () => {
    console.log("Server running on port 5000");
});