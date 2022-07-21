const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../controllers/auth');

router.get('/', user.getHome);
router.post('/register', auth.registerUser);

module.exports = router;