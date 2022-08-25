DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS posts;

CREATE TABLE users(
    user_id serial PRIMARY KEY,
	username text UNIQUE NOT NULL,
	password text NOT NULL
);

CREATE TABLE posts(
    post_id serial PRIMARY KEY,
	title text,
	description text,
    url text,
    status text,
    user_id integer,
    CONSTRAINT fk_user
     FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
	  ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO users(username, password)
VALUES('name1', 'pass1'),
      ('name2', 'pass2');
      
INSERT INTO posts(title, description, url, status, user_id)
VALUES('title1.0', 'des1.0', 'url1.0', 'stat1.0', 1),
      ('title1.1', 'des1.1', 'url1.1', 'stat1.1', 1),
      ('title2.0', 'des2.0', 'url2.0', 'stat2.0', 2);