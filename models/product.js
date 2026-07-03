//const { DataTypes } = require("sequelize");
// fully configured sequelize environment
//const sequelize = require("../utils/database");
const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        const transformedProducts = products.map((product) => {
          return { id: product._id, ...product };
        });
        return transformedProducts;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static edit(productId, { title, price, imageUrl, description }) {
    const db = getDb();
    return db
      .collection("products")
      .updateOne(
        { _id: new mongodb.ObjectId(productId.toString()) },
        { $set: { title, price, imageUrl, description } },
      )
      .then(() => {
        console.log("Product updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  save() {
    const db = getDb();

    return db
      .collection("products")
      .insertOne({
        title: this.title,
        price: this.price,
        imageUrl: this.imageUrl,
        description: this.description,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/*const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}); */

module.exports = Product;
