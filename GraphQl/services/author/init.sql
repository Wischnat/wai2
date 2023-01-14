-- Create a table with 4 columns with prime key author_id, firstname, lastname, age
drop table if exists authors;

CREATE TABLE authors (
  author_id SERIAL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  age INT
);

DO
$do$
BEGIN 
   FOR i IN 1..1000 LOOP
      INSERT INTO authors (firstname, lastname, age) VALUES (md5(random()::text), md5(random()::text), random() * 81 + 18);                       -- declare target columns!
   END LOOP;
END
$do$;