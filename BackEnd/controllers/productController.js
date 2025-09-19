const Product = require("../models/product");

// Get all Product

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Product

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const product = new Product({
      name,
      price,
      category,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null, // store file path
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update product (with optional image)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a Product

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
