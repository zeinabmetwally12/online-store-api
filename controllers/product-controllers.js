const Product = require("../models/product-model");
const fs = require("fs");
const path = require("path");


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            status: "success",
            count: products.length,
            data: {
                products
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: `Failed to fetch products: ${error.message}`
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                product
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        };

        if (req.file) {
            productData.imageUrl = req.file.filename;
        }

        const newProduct = await Product.create(productData);

        res.status(201).json({
            status: "success",
            message: "Product added successfully",
            data: {
                product: newProduct
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }

        if (req.body.name !== undefined) {
            product.name = req.body.name;
        }

        if (req.body.price !== undefined) {
            product.price = req.body.price;
        }

        if (req.body.category !== undefined) {
            product.category = req.body.category;
        }

        if (req.body.stock !== undefined) {
            product.stock = req.body.stock;
        }

        if (req.file) {
            if (product.imageUrl) {
                const oldImagePath = path.join(
                    __dirname,
                    "..",
                    "uploads",
                    "products",
                    product.imageUrl
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            product.imageUrl = req.file.filename;
        }

        await product.save();

        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: {
                product
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }

        if (deletedProduct.imageUrl) {
            const imagePath = path.join(
                __dirname,
                "..",
                "uploads",
                "products",
                deletedProduct.imageUrl
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
            data: {
                product: deletedProduct
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};