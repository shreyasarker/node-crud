import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default (data) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    fs.writeFileSync(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(data), "utf-8");
  } catch (err) {
    console.log(err);
  }
}