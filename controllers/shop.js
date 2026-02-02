const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      prods: products,
    });
  });
  /*Product.fetchAll().then(([rows, fieldData]) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      prods: rows,
    });
  });*/
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        path: "/products",
        product: product,  
      });
    });
};

exports.getCart = (req, res, next) => {
  const cart = Cart.getProducts();
  const products = Product.fetchAll();
  const cartProducts = [];

  for (const prod of products) {
    const cartProduct = cart.products.find((cartP) => cartP.id === prod.id);
    if (cartProduct) {
      cartProducts.push({ productData: prod, qty: cartProduct.qty });
    }
  }

  console.log(cartProducts);

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    products: cartProducts,
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const product = Product.findById(prodId);
  console.log(product);
  Cart.addProduct(product);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  const product = Product.findById(productId);
  if (!product) {
    return res.redirect("/cart");
  }

  Cart.deleteProduct(productId, product.price);

  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
