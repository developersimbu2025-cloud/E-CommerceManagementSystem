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
    const { name, price,category, description } = req.body;
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

// exports.createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body); // takes everything from body
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Update a Product

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const product = await Product.findById(req.params.id);
    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
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
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
