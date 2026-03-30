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

  Product.findByPk(productId).then((product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

exports.getCart = (req, res, next) => {
  const user = req.user;

  user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      console.log("productsxxxx: ", products);
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const user = req.user;
  const prodId = req.body.productId;
  const product = Product.findByPk(prodId);
  let actualCart;

  user
    .getCart()
    .then((cart) => {
      actualCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      const product = products.find((p) => {
        return parseInt(p.id) === parseInt(prodId);
      });

      if (product) {
        // 1- old quantity
        const oldQuantity = product["cart-item"].quantity;
        // 2- new quantity
        const newQuantity = oldQuantity + 1;
        // 3- add product through
        return actualCart.addProduct(product, {
          through: { quantity: newQuantity },
        });
      }

      return Product.findByPk(prodId).then((product) => {
        return actualCart.addProduct(product, { through: { quantity: 1 } });
      });
    });

  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  const user = req.user;

  user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((product) => {
      return product[0]["cart-item"].destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });

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
