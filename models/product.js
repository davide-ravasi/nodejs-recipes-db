const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(productId, title, price, imageUrl, description) {
    this.id = productId;
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

      if (this.id) {
        const prodIndex = products.findIndex((prod) => {
          return prod.id === this.id;
        });

        if (prodIndex === -1) {
          return;
        }

        products[prodIndex] = this;

        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  // static edit(productId, newProduct) {
  //   //console.log("Editing product:", productId, newProduct);

  //   fs.readFile(p, (err, fileContent) => {
  //     let products = [];
  //     if (!err && fileContent.length > 0) {
  //       products = JSON.parse(fileContent);
  //     }

  //     // change products data
  //     const prodIndex = products.findIndex((prod) => {
  //       return prod.id === productId;
  //     });

  //     if (prodIndex === -1) {
  //       return;
  //     }

  //     products[prodIndex] = { ...newProduct };

  //     fs.writeFile(p, JSON.stringify(products), (err) => {
  //       console.log(err);
  //     });
  //   });
  //}

  static fetchAll() {
    return JSON.parse(fs.readFileSync(p, "utf-8") || "[]");
  }

  static findById(id) {
    const products = JSON.parse(fs.readFileSync(p, "utf-8") || "[]");

    return products.find((product) => product.id === id);
  }

  static deleteProduct(id) {
    fs.readFile(p, (err, fileContent) => {
      let products = [];

      if (!err && fileContent.length > 0) {
        products = JSON.parse(fileContent);
      }

      const newProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(newProducts), (err) => {
        console.log(err);
      });
    });
  }
};
