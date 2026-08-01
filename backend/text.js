import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Config:", cloudinary.config());

const file = "./uploads/1785390197607-principal.jpg";
console.log("Exists:", fs.existsSync(file));

try {
  const result = await cloudinary.uploader.upload(file);

  console.log(result);
} catch (err) {
  console.log("NAME:", err.name);
  console.log("MESSAGE:", err.message);
  console.log("HTTP:", err.http_code);

  // 👇 IMPORTANT
  console.dir(err, { depth: null, colors: true });
}