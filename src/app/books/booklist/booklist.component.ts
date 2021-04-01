import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit, OnDestroy {

  bookShelf: Book [] = [];
  private BookSubscription: Subscription;

  constructor(private BookService: BookService) {

  }

  ngOnInit(): void {
    this.BookService.getBooks();
    this.BookSubscription = this.BookService.getBookshelfAtualizedObservable().subscribe(
      (books: Book[]) =>{
        this.bookShelf = books;
      }
    )
  }

  ngOnDestroy(): void {
    this.BookSubscription.unsubscribe();
  }
}
