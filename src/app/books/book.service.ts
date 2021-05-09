import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class BookService {
  private books: Book [] = [];
  private bookShelfAtualized = new Subject <Book[]>();

  constructor(private httpClient: HttpClient){

  }

  getBooks(){
    this.httpClient.get<{message: string, books: any}>('http://localhost:3000/api/books')
    .pipe(map(bookData => {
      return bookData.books.map( book => {
        return{
          id: book._id,
          title: book.title,
          author: book.author,
          pages: book.pages,
        }
      })
    }))
    .subscribe(
      (bookList) =>{
        this.books = bookList;
        this.bookShelfAtualized.next([...this.books]);
      }
    )
  }

  createBook(id:String,title:String,author:String,pages:String){
    const book: Book = {
      id:id,
      title:title,
      author:author,
      pages:pages,
    }
    this.httpClient.post<{message: string}>('http://localhost:3000/api/books', book).subscribe(
      (newBook) => {
        console.log(newBook.message);
        this.books.push(book);
        this.bookShelfAtualized.next([...this.books]);
      }
    );
  }

  removeBook (id: string) :void {
    console.log(id);
    this.httpClient.delete(`http://localhost:3000/api/books/${id}`).subscribe(() => {
      this.books = this.books.filter( book => {
        return book.id !== id
      })
      this.bookShelfAtualized.next([...this.books]);
    })
  }

  getBookshelfAtualizedObservable(){
    return this.bookShelfAtualized.asObservable();
  }
}
