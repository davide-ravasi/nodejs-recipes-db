const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(product) {
    // fetch prev cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const prodCart = cart.products.find((prod) => prod.id === product.id);

      if (prodCart) {
        prodCart.qty = prodCart.qty + 1;
      } else {
        cart.products.push({ id: product.id, qty: 1 });
      }

      cart.totalPrice = cart.totalPrice + parseFloat(product.price);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static getProducts() {
    return JSON.parse(fs.readFileSync(p, "utf-8") || "[]");
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const prodCart = cart.products.find((prod) => prod.id === id);

      if (!prodCart) {
        return;
      }

      const prodQuantity = prodCart.qty;

      cart.totalPrice = cart.totalPrice - price * prodQuantity;

      cart.products = cart.products.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
