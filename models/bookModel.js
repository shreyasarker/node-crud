import books from '../data/books.json' assert {'type' : 'json'};
import generateId from '../utils/generate-id.js';
import writeToFile from '../utils/write-to-file.js';

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(books);
  })
}

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    const book = books.find((book) => book._id === parseInt(id));
    resolve(book);
  });
}

export const store = (book) => {
  return new Promise((resolve, reject) => {
    books.push({_id: generateId(), ...book});
    writeToFile(books);
    resolve(book); 
  });
}

export const update = (id, book) => {
  return new Promise((resolve, reject) => {
    const index = books.findIndex((book) => book._id === parseInt(id));
    books[index] = {_id: parseInt(id), ...book};
    writeToFile(books);
    resolve(books[index]); 
  });
}

export const destory = (id) => {
  return new Promise((resolve, reject) => {
    const index = books.findIndex((book) => book._id === parseInt(id));
    books.splice(index, 1);
    writeToFile(books);
    resolve();
  });
}
