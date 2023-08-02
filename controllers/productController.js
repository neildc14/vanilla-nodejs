const Product = require("../models/productModel");
const { getPostData } = require("../utils/getPostData");

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
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res, id) => {
  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    }

    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const product = {
      title: title || findProduct?.title,
      description: description || findProduct?.description,
      price: price || findProduct?.price,
    };

    console.log({ product });
    const updateProduct = await Product.updateById(product, id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updateProduct));
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res, id) => {
  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    }

    const deletedProduct = await Product.deleteById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(deletedProduct));
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
