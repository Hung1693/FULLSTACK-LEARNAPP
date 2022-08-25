SELECT *

FROM users

INNER JOIN posts

ON users.user_id = posts.user_id
where users.username = 'name1';