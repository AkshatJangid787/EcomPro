const Product = require("../model/product");
const mongoose = require("mongoose");

exports.getAllProduct  = async (req,res,next)=>{
    try {
        const products = await Product.find();
        res.status(200).send({message : "Product Fetched" , data : products})
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req,res,next)=>{
    const { name , price , description , category  } = req.body;
    const productUrl = req.file.path;
    try {
        const product = new Product({name , price , description , category , productUrl});

        await product.save();
        res.status(201).send({message : "Product Added" , data : product});
    } catch (error) {
        next(error);
    }
};


exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const { name, price, description, category } = req.body;

        const updateData = {
            name,
            price,
            description,
            category
        };

        // Only update the product image if a new image is uploaded
        if (req.file) {
            updateData.productUrl = req.file.path; // Assuming this is the field for the image URL
        }

        // Use the validated ObjectId
        const updatedProduct = await Product.findByIdAndUpdate(
            id, // Mongoose will handle conversion internally
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error updating product', error });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        next(error);
    }
};