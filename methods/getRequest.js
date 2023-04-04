export default (req, res) => {
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = parseInt(req.url.split("/")[3]);
  
  if (req.url === "/api/books" && (id === undefined || isNaN(id))) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.books));
    res.end();
  } else if (baseURL === "/api/books/" && id !== undefined) {
    let filterBook = req.books.find((book) => book._id === id);
    if(filterBook !== undefined) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(filterBook));
      res.end();
    }else{
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ title: "Not found", message: "Movie not found." }));
    }
  } 
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found." }));
  }
};