const express  = require('express');
const cors     = require('cors');
const Books    = require('./models/book');
const env      = require('./env');
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://Fatec_ipi_20211_paoo:${env.mongoPassword}@cluster0.uzfsq.mongodb.net/${env.dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology:true }
)
.then(() => console.log('Conexão MongoDB: ok'))
.catch(error => console.log(error));

const app = express();

app.use(express.json());
app.use(cors());


app.post('/api/books', (req, res, next) => {
  const book = new Books({
    id: req.body.id,
    title:req.body.title,
    author:req.body.author,
    pages:req.body.pages,
  });
  book.save();
  res.status(201).json({message: 'Book Inserted'});
});

app.get("/api/books", (req, res, next) => {
  Books.find().then( booksData => {
    res.status(200).json({
      message:"Ok",
      books: booksData
    })
  })
});

// app.use("/api/books", (req, res, next) => {
//   res.json({
//     message:"Tudo ok",
//     books:books
//   });
// });

module.exports = app;
