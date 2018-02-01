const { db, bcrypt } = require('./db');

const create = (email,password) => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds)
    .then((hash) => {
      const query = `INSERT INTO users (email, password) VALUES($1, $2) RETURNING *`;
      return db.one(query, [email, hash]);
    });
};

const getByEmail = (email) => {
  const query = `SELECT * FROM users WHERE email=$1`;
  return db.oneOrNone(query, [email]);
};

const getById = (id) => {
  const query = `SELECT * FROM users WHERE id=$1`;
  return db.oneOrNone(query, [id]);
};

const update = (name, current_city, user_image, id) => {
  const query = `UPDATE users SET (name, current_city, user_image) = ($1,$2,$3) WHERE id = $4 RETURNING *`;
  return db.any(query, [name, current_city, user_image, id]);
};

module.exports = {
  create,
  getByEmail,
  getById,
  update,
};
