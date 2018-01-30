const express = require('express');

const router = express.Router();
const reviewFunctions = require('../../models/db/review');
const userFunctions = require('../../models/db/user');

router.get('/:city', (request, response) => {
  const { city } = request.params;

  reviewFunctions.displayCitySpecificReviews(city)
    .then((cityReviews) => {
      console.log('city====>', cityReviews)
      return cityReviews;
    })
    .then((cityReviews) => {
      console.log('city-reviews==>', cityReviews[0].city)
      userFunctions.getById(cityReviews[0].user_id)
        .then((reviewer) => {
        console.log('2city====>', reviewer)
          response.render('cities/city', { reviews: cityReviews, user: reviewer, city: true });
        });
    });
});

module.exports = router;
