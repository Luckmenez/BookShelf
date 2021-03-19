import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  constructor(private BookService: BookService) {

  }

  createBook(form: NgForm){
    console.log(form)
    if(form.invalid) return;
    this.BookService.createBook(
      form.value.id,
      form.value.title,
      form.value.author,
      form.value.pages
    )
    form.resetForm();
  }


  ngOnInit(): void {
  }

}
