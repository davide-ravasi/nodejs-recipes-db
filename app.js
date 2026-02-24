const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
//const db = require("./utils/database");
const sequelize = require("./utils/database");
const User = require("./models/user");
const Product = require("./models/product");

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
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.use("/admin", adminRoutes.routes);

app.use(shopRoutes);

// 404 page - it catch all the requests
// that are not handled by any of the above routes
app.use(errorController.get404);

/* app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Welcome to the home page!</h1>
    <p>This is the main entry point of our application.</p>
    <form action='/create-user' method='POST'>
      <input type='text' name='username'>
      <button type='submit'>Submit</button>
    </form>
  `);
}); */

// define the relationships between the models
// constraints: true means that the user is required to be present
// onDelete: "CASCADE" means that if the user is deleted, all products associated with the user will be deleted
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// sync the database with the models
// sync() synchronizes all defined models to the database
//
// Options:
// - No options (default): Creates tables ONLY if they don't exist
//   Does NOT alter existing tables or columns
//
// - { force: true }: DROPS existing tables and recreates them
//   WARNING: This deletes all data! Use only in development
//
// - { alter: true }: Alters existing tables to match model definitions
//   Adds new columns, but may not remove columns or change types safely
//
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Davide", email: "davide@example.com" });
    }

    return Promise.resolve(user);
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen do the same as below, express does it for us
// const server = http.createServer(app);

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });
