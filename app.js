const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

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

app.listen(3000);

// app.listen do the same as below, express does it for us
// const server = http.createServer(app);

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });
