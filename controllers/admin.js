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

  /*const product = new Product(null, title, price, imageUrl, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    }); */

  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then((results) => {
      console.log("Created product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products,
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  // add edit mode
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product" + product.title,
      path: "/admin/edit-products",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.redirect("/");
    }
    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;
    await product.save();
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
    res.redirect("/admin/products");
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.redirect("/admin/products");
    }
    await product.destroy();
    console.log("Product deleted");
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
    res.redirect("/admin/products");
  }
};
