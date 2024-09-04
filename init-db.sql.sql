CREATE DATABASE myDb;

\c myDb;

CREATE TABLE lupa
(
    Id SERIAL PRIMARY KEY,
    Age INTEGER, 
    FirstName VARCHAR(20),
	capital NUMERIC(20,4),
	newDate DATE
);
  
CREATE TABLE pupa
(
    Id SERIAL PRIMARY KEY,
    lupaId INTEGER REFERENCES lupa (Id),
    Age INTEGER, 
    FirstName VARCHAR(100),
	capital NUMERIC(20,4),
	newDate DATE
);


INSERT INTO lupa(Age,FirstName,capital,newDate)
SELECT random()*30+18 as Age,substring(md5(random()::text) from 0 for 19) as FirstName , ROUND((random()*10)::numeric, 4)::numeric as capital, '2023-01-01 00:00:00'::timestamp + ('2023-12-31 23:59:59'::timestamp-'2023-01-01 00:00:00'::timestamp)*random()
FROM generate_series(1,10000);

INSERT INTO pupa(lupaId,Age,FirstName,capital,newDate)
SELECT *
FROM lupa

