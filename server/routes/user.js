const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../controllers/auth');
const activities = require('../controllers/activities');

router.get('/', user.getHome);
router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);
router.get('/profile', user.viewProfile);
router.get('/categories', activities.getCategories);
router.get('/activities/:category', activities.getActivities);
router.get('/verify/:token', auth.verifyUserEmail);
router.post('/addnewactivity', user.addNewActivity)

module.exports = router;