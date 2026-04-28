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
  let actualCart;

  user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      actualCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      let newQuantity = 1;

      if (product) {
        const oldQuantity = product["cart-item"].quantity;
        newQuantity = oldQuantity + 1;
      }

      return Product.findByPk(prodId).then((productToAdd) => {
        if (!productToAdd) {
          throw new Error("Product not found");
        }
        return actualCart.addProduct(productToAdd, {
          through: { quantity: newQuantity },
        });
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/cart");
    });
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
