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
    username text,
    CONSTRAINT fk_user
     FOREIGN KEY(username) 
	  REFERENCES users(username)
	  ON DELETE CASCADE ON UPDATE CASCADE
);
