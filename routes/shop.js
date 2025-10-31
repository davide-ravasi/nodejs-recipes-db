const router = require("express").Router();
const shopController = require("../controllers/shop");

// / => GET
router.get("/", shopController.getIndex);

// /products => GET
router.get("/products", shopController.getProducts);

// /products/:productId => GET
router.get("/products/:productId", shopController.getProduct);

// /cart => GET
router.get("/cart", shopController.getCart);

// /cart => POST
router.post("/cart", shopController.postCart);

// /orders => GET
router.get("/orders", shopController.getOrders);

module.exports = router;

// path.join is used to create a path that works on all operating systems
// __dirname is the directory of the current module (routes/shop.js)
// "views" is the folder where the HTML file is located
// "shop.html" is the HTML file to be served
// This way we avoid issues with different path separators on diff erent OS
