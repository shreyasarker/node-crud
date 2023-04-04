/**
 * Create HTTP Server
 */

import { createServer } from "http";
import dotenv from "dotenv";
import getRequest from "./methods/getRequest.js";
import postRequest from "./methods/postRequest.js";
import putRequest from "./methods/putRequest.js";
import deleteRequest from "./methods/deleteRequest.js";
import books from "./data/books.json" assert {type: "json"};

dotenv.config();

/**
 * Have a Port to server to listen to
 */

const PORT = process.env.PORT || 5001;

/**
 * Create HTTP Server
 */

const server = createServer((req, res) => {
  req.books = books;
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ title: "Not Found", message: "Route not found." }));
      res.end();  
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});