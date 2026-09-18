const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db-connect");

const productRoutes = require("./routes/product-routes");
const authRoutes = require("./routes/auth-routes");
const cartRoutes = require("./routes/cart-routes");

// 1. Initialize Express app FIRST
const app = express();

// 2. Global Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 3. Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Online Store API is running" });
});

// 4. API Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cart", cartRoutes);

// 5. Connect Database and Start Server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const orderRoutes = require('./routes/order-routes');
app.use('/api/v1/orders', orderRoutes);