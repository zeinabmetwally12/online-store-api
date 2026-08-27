const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer-middleware");
const protect = require("../middleware/auth-middleware");
const authorize = require("../middleware/role-middleware");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product-controllers");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post(
    "/",
    protect,
    authorize("admin"),
    upload.single("image"),
    createProduct
);

router.patch(
    "/:id",
    protect,
    authorize("admin"),
    upload.single("image"),
    updateProduct
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteProduct
);

module.exports = router;