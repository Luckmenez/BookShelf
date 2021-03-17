import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Output() bookAdded = new EventEmitter();
  id: String;
  author: String;
  title: String;
  pages: String;

  createBook(){
    const book: Book = {
      id:this.id,
      author: this.author,
      title: this.title,
      pages: this.pages,
    }
    this.bookAdded.emit(book);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
