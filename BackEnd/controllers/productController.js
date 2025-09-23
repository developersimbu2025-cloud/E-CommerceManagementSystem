const Product = require("../models/product");

// 🔍 Search products by name or category
exports.searchProduct = async (req, res) => {
  try {
    const { name, category } = req.query;

    // Build search filter
    let filter = {};

    if (name) {
      // Case-insensitive partial search
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const {
      name,
      price,
      originalPrice,
      category,
      description,
      rating,
      reviews,
      inStock,
    } = req.body;

    const product = new Product({
      name,
      price,
      originalPrice,
      category,
      description,
      rating,
      reviews,
      inStock,
      image: req.file ? `/uploads/${req.file.filename}` : null, // fixed template literal
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
    const {
      name,
      price,
      originalPrice,
      category,
      description,
      rating,
      reviews,
      inStock,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    product.name = name || product.name;
    product.price = price || product.price;
    product.originalPrice = originalPrice || product.originalPrice;
    product.category = category || product.category;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.reviews = reviews || product.reviews;
    product.inStock = inStock || product.inStock;

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
