// Import library express
const express = require('express');
const{body} = require('express-validator')

// Import controller
const authController = require('../controllers/auth');

// Deklarasi variabel untuk pemanggilan endpoint
const router = express.Router();

// Support API Request 1 (Gak dipanggil di FE) : Post Create -> [localhost:4000/auth/createkasir]
router.post('/createkasir', 
    [body('username').isLength({min: 3}).withMessage('Username must be at least 3 characters long')], 
    authController.createKasir);

// Endpoint 1 : POST -> Gak Create, cuma buat login [localhost:4000/auth/login]
router.post('/login', 
    authController.login);

module.exports = router;