import { Component, Input } from '@angular/core';
import { Book } from './books/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() bookShelf: Book [] = [];

  onBookAdded(book){
    this.bookShelf = [book, ...this.bookShelf];
  }
}
