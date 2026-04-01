import dotenv from "dotenv";
dotenv.config();
console.log('process.env.CLIENT_ID:', process.env.CLIENT_ID);

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = "http://localhost:3000/callback";
export const JWT_SECRET = "my_app_secret";