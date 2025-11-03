const router = require("express").Router();
const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/product => POST
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/products => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/edit-product => POST
router.post("/edit-product/:productId", adminController.postEditProduct);

exports.routes = router;
