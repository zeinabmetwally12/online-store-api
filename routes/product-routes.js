const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer-middleware");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product-controllers");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", upload.single("image"), createProduct);

router.patch("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;