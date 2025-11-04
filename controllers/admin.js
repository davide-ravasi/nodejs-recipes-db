const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    product: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const product = new Product(null, title, price, imageUrl, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();

  res.render("admin/products", {
    pageTitle: "Admin Products",
    path: "/admin/products",
    prods: products,
  });
};

exports.getEditProduct = (req, res, next) => {
  // add edit mode
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  const product = Product.findById(prodId);

  if (!product) {
    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit Product" + product.title,
    path: "/admin/edit-products",
    editing: editMode,
    product: product,
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const updatedProduct = new Product(
    productId,
    title,
    price,
    imageUrl,
    description
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};
