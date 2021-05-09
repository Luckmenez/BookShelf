const express  = require('express');
const cors     = require('cors');
const Books    = require('./models/book');
const env      = require('./env');
const mongoose = require('mongoose');
const book = require('./models/book');

const userDB    = process.env.MONGODB_USER;
const passDB    = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.MONGODB_CLUSTER;
const nameDB    = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb+srv://${userDB}:${passDB}@${clusterDB}.mongodb.net/${nameDB}?retryWrites=true&w=majority`,
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
  book.save().then( bookInserted => {
    res.status(201).json({
      message: 'Book Inserted',
      id: bookInserted._id
    })
  });
});

app.get("/api/books", (req, res, next) => {
  Books.find().then( booksData => {
    res.status(200).json({
      message:"Ok",
      books: booksData
    })
  })
});

app.delete('/api/books/:id', (req, res) => {
  book.deleteOne({_id:req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({message: 'cliente Removido'});
  })
});

module.exports = app;
