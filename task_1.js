const taskHandler = (req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to the home page!</h1>");
    res.write("<p>This is the main entry point of our application.</p>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Submit</button></form>"
    );
    return res.end();
  }

  if (url === "/users") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Users Page</h1>");
    res.write("<ul><li>User 1</li><li>User 2</li></ul>");
    return res.end();
  }

  if (url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log("User created:", username);
      res.writeHead(302, { Location: "/users" });
      return res.end();
    });
  }
};

module.exports = taskHandler;
