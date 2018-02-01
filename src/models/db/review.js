const { db } = require('./db');

const displayAll = () => {
  const query = `SELECT * FROM reviews`;
  return db.any(query, []);
};

const create = (user_id, type_id, title, body, city) => {
  const query = `INSERT INTO reviews(user_id, type_id, title, body, city) VALUES ($1, $2, $3, $4, $5)`;
  return db.any(query, [user_id, type_id, title, body, city])
};

const displaySingleReview = (id) => {
  const query = `SELECT * FROM reviews WHERE reviews.id = $1`;
  return db.one(query, [id])
};

const displayUserSpecificReviews = (user_id) => {
  const query = `SELECT * FROM reviews WHERE reviews.user_id = $1`;
  return db.any(query, [user_id]);
};

const displayCitySpecificReviews = (city) => {
  const query = `SELECT * FROM reviews WHERE reviews.city = $1`;
  return db.any(query, [city]);
};

const updateReview = (id, type_id, title, body, city) => {
  const query = `UPDATE reviews SET (type_id, title, body, city) = ($2, $3, $4, $5) WHERE reviews.id = $1`;
  return db.none(query, [id, type_id, title, body, city]);
};

const deleteReview = (id) => {
  const query = `DELETE FROM reviews WHERE reviews.id = $1`;
  return db.none(query, [id]);
};


module.exports = {
  displayAll,
  create,
  displaySingleReview,
  displayUserSpecificReviews,
  displayCitySpecificReviews,
  updateReview,
  deleteReview,
};
