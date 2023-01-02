-- Create a table with 4 columns with prime key author_id, firstname, lastname, age
drop table if exists authors;

CREATE TABLE authors (
  author_id SERIAL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  age INT
);

INSERT INTO authors (firstname, lastname, age) VALUES ('John', 'Doe', 100);
INSERT INTO authors (firstname, lastname, age) VALUES ('Alex', 'Wick', 55);