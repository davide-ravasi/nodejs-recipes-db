const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(title, price, imageUrl, description) {
    this.id = Math.random().toString();
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];

      if (!err && fileContent.length > 0) {
        products = JSON.parse(fileContent);
      }

      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll() {
    return JSON.parse(fs.readFileSync(p, "utf-8") || "[]");
  }

  static findById(id) {
    const products = JSON.parse(fs.readFileSync(p, "utf-8") || "[]");

    return products.find((product) => product.id === id);
  }
};
