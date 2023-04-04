import writeToFile from "../utils/write-to-file.js";

export default (req, res) => {
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
      req.books.splice(index, 1);
      writeToFile(req.books);
      res.statusCode = 204;
      res.setHeader("Content-Type", "application/json");
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found." }));
  }
};