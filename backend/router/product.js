const express = require("express");
const upload = require("../middleware/multer");
const { getAllProduct , createProduct, updateProduct, deleteProduct } = require("../controller/product")
const router = express.Router();


router.get("/product",getAllProduct);
router.post("/product",upload.single("productImage"),createProduct);
router.put('/products/:id', upload.single('productImage'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;