const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
//const errorController = require("./controllers/error");
const dotenv = require("dotenv");
const { mongoConnect } = require("./utils/database");

dotenv.config();

const app = express();

// db.execute("SELECT * FROM products LIMIT 50")
//   .then(([rows, fieldData]) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Must run before routes that use req.user
app.use((req, res, next) => {
  /* User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });*/
  next();
});

app.use("/admin", adminRoutes.routes);

app.use(shopRoutes);

// 404 page - it catch all the requests
// that are not handled by any of the above routes
//app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
