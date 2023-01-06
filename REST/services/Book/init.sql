-- Create a table with 4 columns with prime key author_id, firstname, lastname, age
drop table if exists books;

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  release_year INT
);


INSERT INTO books (title, author, release_year) VALUES ('Alle meine Entons', '1', 2022);
INSERT INTO books (title, author, release_year) VALUES ('Schneewitchen', '2', 2023);