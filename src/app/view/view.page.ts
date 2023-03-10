import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage {
  books: Book[] = [];
  userId: number;

  constructor(public bookService: BookService) {
    this.userId = 1;
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAll(this.userId).subscribe({
      next: (value: { books: Book[] }) => {
        this.books = value.books;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  findBook(id: string) {
    if (!id) {
      this.getAllBooks();
      return;
    }
    this.bookService.getOne(this.userId, Number(id)).subscribe({
      next: (value: { books: Book[] }) => {
        this.books = value.books;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
