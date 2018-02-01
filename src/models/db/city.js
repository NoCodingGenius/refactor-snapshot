const { db } = require('./db');

const displayAll = () => {
  const query = `SELECT * FROM cities`;
  return db.any(query, []);
};

const create = (city_name) => {
  const query = `INSERT INTO cities(city_name) VALUES ($1)`;
  return db.one(query, [city_name]);
};

const displayCityByName = (city_name) => {
  const query = `SELECT * FROM cities WHERE cities.city_name = $1`;
  return db.any(query, [city_name]);
};

const displayCityById = (id) => {
  const query = `SELECT * FROM cities WHERE cities.id = $1`;
  return db.any(query, [id]);
};

const update = (id, city_name, city_image) => {
  const query = `UPDATE cities SET (city_name, city_image) = ($2) WHERE cities.id = $1`;
  return db.one(query, [id, city_name, city_image]);
};

module.exports = {
  displayAll,
  create,
  displayCityByName,
  displayCityById,
  update,
};
