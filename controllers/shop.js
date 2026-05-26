const Cart = require("../models/cart");
const Product = require("../models/product");
const OrderItem = require("../models/order-item");

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
  const user = req.user;
  user
    .getOrders()
    .then((orders) => {
      return orders[0].getProducts();
    })
    .then((products) => {
      console.log("products: ", products);
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  const user = req.user;
  console.log("postOrder");
  let actualProducts;
  let actualCart;

  user
    .getCart()
    .then((cart) => {
      actualCart = cart; // it is assigned after the promise is resolved
      return cart.getProducts();
    })
    .then((products) => {
      actualProducts = products; // it is assigned after the promise is resolved
      return user.createOrder();
    })
    .then((order) => {
      //console.log("order: ", order);
      //console.log("products: ", actualProducts);
      actualProducts.forEach((product) => {
        console.log("product: ", product);
        console.log(
          "product['cart-item'].quantity: ",
          product["cart-item"].quantity,
        );
        order.addProduct(product, {
          through: { quantity: product["cart-item"].quantity || 1 },
        });
      });
      return order;
    })
    .then(() => {
      return actualCart.setProducts(null, { through: null });
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
