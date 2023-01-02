-- Create a table with 4 columns with prime key author_id, firstname, lastname, age
drop table if exists authors;

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author INT,
  release_year INT
);