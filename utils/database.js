const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  const user = process.env.MONGODB_USER;
  const pw = process.env.MONGODB_PW;
  const dbName = process.env.MONGODB_DB;
  let _db;

  MongoClient.connect(
    "mongodb+srv://" +
      user +
      ":" +
      pw +
      "@cluster0.ijrdt.mongodb.net/" +
      dbName +
      "?retryWrites=true&w=majority",
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "NO database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
