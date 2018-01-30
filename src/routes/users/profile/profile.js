const express = require('express');

const router = express.Router();
const reviewFunctions = require('../../../models/db/review');
const userFunctions = require('../../../models/db/user');


router.get('/', (request, response) => {
  const userId = request.user.id;
  reviewFunctions.displayUserSpecificReviews(userId)
    .then((userReviews) => {
      response.render('users/profile', { user: request.user, editing: false, reviews: userReviews, city: false });
    });
});

router.get('/edit', (request, response) => {
  reviewFunctions.displayUserSpecificReviews(request.user.id)
    .then((reviews) => {
      response.render('users/profile', { user: request.user, editing: true, reviews, city: false });
    });
});

router.post('/edit', (request, response) => {
  const {
    name,
    current_city,
    user_image,
    id,
  } = request.body;
  userFunctions.update(name, current_city, user_image, id)
    .then(() => {
      response.redirect('/profile/updated');
    }).catch((error) => {
      console.error(error.message);
    });
});

router.get('/updated', (request, response) => {
  reviewFunctions.displayUserSpecificReviews(request.user.id)
    .then((reviews) => {
      response.render('users/profile', { user: request.user, editing: false, reviews, city:false });
    });
});

router.get('/review', (request, response) => {
  const userId = request.user.id
  reviewFunctions.displayUserSpecificReviews(userId)
    .then((allUserReviews) => {
      response.render('users/profile', { user: request.session.user, reviews: allUserReviews, city: true });
    });
});

module.exports = router;
