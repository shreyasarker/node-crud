import booksBodyParser from "../utils/books.body-parser.js";
import writeToFile from "../utils/write-to-file.js";

export default async (req, res) => {
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = parseInt(req.url.split("/")[3]);

  if (baseURL === "/api/books/" && id !== undefined) {
    let index = req.books.findIndex((book) => {
      return book._id === id;
    });
    if(index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ title: "Not found", message: "Movie not found." }));
    }else{
      try {
        let body = await booksBodyParser(req);
        req.books[index] = { _id: id, ...body };
        writeToFile(req.books);
        res.statusCode = 204;
        res.setHeader("Content-Type", "application/json");
        res.end();
      }catch (err) {
        console.log(err);
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Error", message: "Something went wrong!"}));
      }
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found." }));
  }
};