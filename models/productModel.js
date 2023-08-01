const products = require("../data/products");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils/writeData");

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
};

const updateById = (product, id) => {
  return new Promise((resolve, reject) => {
    try {
      const idx = products.findIndex((prod) => prod.id === id);

      products[idx] = { id, ...product };
      writeDataToFile("./data/products.json", products);
      resolve(products[idx]);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
};
