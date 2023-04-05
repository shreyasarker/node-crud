/**
 * Create HTTP Server
 */

import { createServer } from 'http';
import dotenv from 'dotenv';
import { getBooks, getBook, storeBook, updateBook, destroyBook } from './controllers/bookController.js';
dotenv.config();

/**
 * Have a Port to server to listen to
 */

const PORT = process.env.PORT || 5001;

/**
 * Create HTTP Server
 */

const server = createServer((req, res) => {
  if(req.url === '/api/books' && req.method === 'GET') {
    getBooks(req, res);
  } else if (req.url.match(/\/api\/books\/[0-9]+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getBook(req, res, id);
  } else if (req.url === '/api/books' && req.method === 'POST') {
    storeBook(req, res);
  } else if (req.url.match(/\/api\/books\/[0-9]+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateBook(req, res, id);
  }else if (req.url.match(/\/api\/books\/[0-9]+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    destroyBook(req, res, id);
  } else {
    res.writeHead(404, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not found.' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});