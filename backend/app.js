const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(express.json);
app.use(cors());

const clientes = [
  {
    id:'1',
    title:'Tres mosqueteiros',
    author:'Lucas',
    pages:'3'
  },
  {
    id:'2',
    title:'Dois mosqueteiros',
    author:'Lucas',
    pages:'2'
  },
];

app.post('/api/books', (req, res, next) => {
  const books = req.body;
  console.log(books);
  res.status(201).json({message: 'Book Inserted'});
});

app.use("/api/books", (req, res, next) => {
  res.status(200).json({
    message:"Tudo ok",
    books:books
  });
});

module.exports = app;
