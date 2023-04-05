import books from '../data/books.json' assert { type : 'json' };

export default () => {
  let id;
    if (books !== undefined && books.length > 0) {
      id = parseInt(books[books.length - 1]._id)  + 1;
    } else {
      id = 1;
    }
    return parseInt(id);
}