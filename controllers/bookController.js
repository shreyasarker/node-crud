import * as Book from '../models/bookModel.js';
import booksBodyParser from '../utils/books.body-parser.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(books));
  } catch (err) {
    console.log(err);
  }
}
export const getBook = async (req, res, id) => {
  try {
    const book = await Book.findById(id);
    if ( !book ) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ title: 'Not found', message: 'Book not found.' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(book));
    }
  } catch (err) {
    console.log(err);
  }
}
export const storeBook = async (req, res) => {
  try {
    let newBook = await booksBodyParser(req);
    Book.store(newBook);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end();
  } catch (err) {
    console.log(err);
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ title: 'Error', message: 'Something went wrong!' }));
  }
}
export const updateBook = async (req, res, id) => {
  try {
    const book = await Book.findById(id);

    if( !book ) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ title: 'Not found', message: 'Book Not Found' }))
    } else {
      let updatedBook = await booksBodyParser(req);
      Book.update(id, updatedBook);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ title: 'Error', message: 'Something went wrong!' }));
  }
}
export const destroyBook = async (req, res, id) => {
  try {
    const book = await Book.findById(id);

    if( !book ) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ title: 'Not found', message: 'Book Not Found' }));
    } else {
      Book.destory(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ title: 'Error', message: 'Something went wrong!' }));
  }
}