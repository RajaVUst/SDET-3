package com.apitesting.models;

import java.util.List;

public class BooksResponse {
    private List<Book> books;

    public List<Book> getBooks() { return books; }

    public static class Book {
        private String isbn;
        private String title;
        private String author;

        public String getIsbn() { return isbn; }
        public String getTitle() { return title; }
        public String getAuthor() { return author; }
    }
}