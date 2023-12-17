// Import library
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Import router-router
const authRoutes = require('./src/routes/auth');
const tenantRoutes = require('./src/routes/tenant');
const pesananRoutes = require('./src/routes/pesanan');
const menuRoutes = require('./src/routes/menu');

// Tempat penyimpanan file
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Deklarasi
const server = express();
server.use(bodyParser.json()); 
server.use('/images', express.static(path.join(__dirname, 'images')));
server.use(multer({storage: fileStorage, fileFilter: filefilter}).single('image'));

// Error cors origin
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Pemanggilan router (berdasarkan group)
// GROUP 1 : Authentication
server.use('/auth', authRoutes);

// GROUP 2 : Tenant
server.use('/tenant', tenantRoutes);

// GROUP 3 : Pesanan
server.use('/pesanan', pesananRoutes);

// GROUP 4 : Menu
server.use('/menu', menuRoutes);

// Error middleware
server.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

mongoose.connect('mongodb+srv://satset:timsatset@cluster-fcb-tenant-hub.nmd9knc.mongodb.net/fcb-tenant-hub?retryWrites=true&w=majority')
.then(() => {
    // Hit localhost:4000
    server.listen(4000, () => console.log('Connection Success'));
})
.catch(err => console.log(err));