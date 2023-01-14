-- Create a table with 4 columns with prime key author_id, firstname, lastname, age
drop table if exists books;

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  release_year INT
);

DO
$do$
BEGIN 
   FOR i IN 1..5000 LOOP
      INSERT INTO books (title, author, release_year) VALUES (md5(random()::text), floor(random() * 999 + 1)::int, random() * 123 + 1900);                       -- declare target columns!
   END LOOP;
END
$do$;