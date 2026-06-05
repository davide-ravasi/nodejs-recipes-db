const mongodb = require("mongodb");
const MongoCLient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  const user = process.env.MONGODB_USER;
  const pw = process.env.MONGODB_PW;
  const dbNAme = process.env.MONGODB_DB;

  MongoCLient.connect(
    "mongodb+srv://" +
      user +
      ":" +
      pw +
      "@cluster0.ijrdt.mongodb.net/" +
      dbNAme +
      "?retryWrites=true&w=majority",
  )
    .then((client) => {
      console.log("connected");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
