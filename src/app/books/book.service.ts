import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class BookService {
  private books: Book [] = [];
  private bookShelfAtualized = new Subject <Book[]>();

  constructor(private httpClient: HttpClient){

  }

  getBooks(){
    this.httpClient.get<{message: string, books: Book[]}>('http://localhost:3000/api/books').subscribe(
      (bookList) =>{
        this.books = bookList.books;
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

  getBookshelfAtualizedObservable(){
    return this.bookShelfAtualized.asObservable();
  }
}
