import booksBodyParser from "../utils/books.body-parser.js";
import books from "../data/books.json" assert { type: "json"};

export default async (req, res) => {
  if(req.url === "/api/books") {
    try {
      let body = await booksBodyParser(req);
      // console.log(body);
      if(books !== undefined && books.length > 0) {
        let id = parseInt(books[books.length - 1]._id) + 1;
        body._id = id;
        console.log(id);
      } else {
        body._id = 1;
      }
      req.books.push(body);
      res.writeHead(201, {"Content-Type": "application/json"});
      res.end();
    } catch(err) {
      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify({title: "Error", message: "Something went wrong!"}));
    }
  }
};