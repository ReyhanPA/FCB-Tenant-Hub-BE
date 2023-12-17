// Import library express
const express = require('express');
const {body} = require('express-validator');

// Import controller
const tenantController = require('../controllers/tenant');

// Deklarasi variabel untuk pemanggilan endpoint
const router = express.Router();

// Endpoint 0 : Post -> gak CREATE, tapi buat login [localhost:4000/tenant/logintenant]
router.post('/logintenant', 
    tenantController.loginTenant);

// Endpoint 1 : POST -> CREATE [localhost:4000/tenant/createtenant]
router.post('/createtenant',
    [body('namatenant').isLength({min: 3}).withMessage('Nama tenant harus lebih dari 3 karakter yah brow')], 
    tenantController.createTenant);

// Endpoint 2 : GET -> READ [localhost:4000/tenant/readtenant]
router.get('/readtenant', 
    tenantController.getAllTenant);

// Endpoint 3 : GET -> READ BY ID [localhost:4000/tenant/readtenantunique/{postId}]
router.get('/readtenantunique/:postId', 
    tenantController.getTenantById);

// Endpoint 4 : DELETE -> REMOVE [localhost:4000/tenant/deletetenant/{postId}]
router.delete('/deletetenant/:postId', 
    tenantController.deleteTenant);

module.exports = router;