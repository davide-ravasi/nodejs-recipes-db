const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to the home page!</h1>");
    res.write("<p>This is the main entry point of our application.</p>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form>"
    );
    return res.end();
  }

  if (url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Welcome to the page!</h1>");
  res.write("<p>This is the main entry point of our application.</p>");
};

module.exports = requestHandler;
