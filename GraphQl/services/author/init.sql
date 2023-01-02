-- Create a table with 4 columns with prime key author_id, firstname, lastname, age
drop table if exists authors;

CREATE TABLE authors (
  author_id INT PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  age INT
);


INSERT INTO authors (author_id, firstname, lastname, age) VALUES (1, 'John', 'Doe', 100);
INSERT INTO authors (author_id, firstname, lastname, age) VALUES (2, 'Alex', 'Wick', 55);