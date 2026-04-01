const http = require("http");
const url = require("url");

const {
  getGoogleAuthURL,
  getTokens,
  getUserFromIdToken,
  createAppToken
} = require("./auth");

const PORT = 3000;

const server = http.createServer(async (req, res) => {

  // 🔹 Route: Home
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>Google Login Demo</h2>
      <a href="/login">Login with Google</a>
    `);
  }

  // 🔹 Route: Redirect to Google
  else if (req.url === "/login") {
    const url = getGoogleAuthURL();
    res.writeHead(302, { Location: url });
    res.end();
  }

  // 🔹 Route: Callback
  else if (req.url.startsWith("/callback")) {
    const query = url.parse(req.url, true).query;
    const code = query.code;

    try {
      const { id_token } = await getTokens(code);

      const user = getUserFromIdToken(id_token);

      const appToken = createAppToken(user);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "Login successful",
        user,
        token: appToken
      }, null, 2));

    } catch (err) {
      res.writeHead(500);
      res.end("Authentication failed");
    }
  }

  else {
    res.writeHead(404);
    res.end("Not found");
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});