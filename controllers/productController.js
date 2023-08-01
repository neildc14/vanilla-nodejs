const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify({ error }));
  }
};

const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify({ error }));
  }
};

const createProduct = async (req, res) => {
  try {
    const product = {
      title: "Test Product",
      description: "This is my products",
      price: 200,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
