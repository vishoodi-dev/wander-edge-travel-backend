const axios = require("axios");
const jwt = require("jsonwebtoken");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, JWT_SECRET } = require("./config");

// Step 1: Generate Google Login URL
function getGoogleAuthURL() {
  return `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid profile email` +
    `&access_type=offline`;
}

// Step 2: Exchange code for tokens
async function getTokens(code) {
  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code"
    }
  );

  return response.data;
}

// Step 3: Decode ID Token
function getUserFromIdToken(idToken) {
  return jwt.decode(idToken);
}

// Step 4: Create your app JWT
function createAppToken(user) {
  return jwt.sign(
    {
      userId: user.sub,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}
console.log('getGoogleAuthURL:', getGoogleAuthURL());
module.exports = {
  getGoogleAuthURL,
  getTokens,
  getUserFromIdToken,
  createAppToken
};