import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';

@Injectable({providedIn:'root'})
export class BookService {
  private books: Book [] =[];
  private bookShelfAtualized = new Subject <Book[]>();

  getBooks(){
    return [...this.books];
  }

  createBook(id:String,title:String,author:String,pages:String){
    const book: Book = {
      id:id,
      title:title,
      author:author,
      pages:pages,
    }
    this.books.push(book);
    this.bookShelfAtualized.next([...this.books]);
  }
  getBookshelfAtualizedObservable(){
    return this.bookShelfAtualized.asObservable();
  }
}
