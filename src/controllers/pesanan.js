const {validationResult} = require('express-validator');

const Pesanan = require('../models/pesanan');

//ENDPOINT 1 : GET All Pesanan
exports.getAllPesanan = (req, res, next) => {
    Pesanan.find()
    .then(result => {
        res.status(200).json({
        message : 'Get All Pesanan Success',
        data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

//ENDPOINT 2 : CREATE Pesanan
exports.createPesanan = async (req, res, next) => {
    // console.log('request : ', req.body);
    const nomormeja = req.body.nomormeja;
    const listmenu = req.body.listmenu || [];
    const hargatotal = req.body.hargatotal;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    
    const checknomormeja = await Pesanan.findOne({nomormeja:nomormeja})
    if(!checknomormeja) {
        const Order = new Pesanan({
            nomormeja: nomormeja,
            listmenu: listmenu,
            hargatotal: hargatotal,
        })

        Order.save()
        .then(result => {
            res.status(201).json({
                message : 'Create Pesanan Success',
                data: result
            });
        })
        .catch(err => {
            console.log('err: ', err)
        });
    } else {
        res.json("Nomor meja sedang digunakan");
    }
}

//ENDPOINT 3 : Update Pesanan
exports.patchPesanan = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const listmenu = req.body.listmenu;
    // const hargatotal = req.body.hargatotal;
    // const statuspesanan = req.body.listmenu.statuspesanan;
    const postId = req.params.postId;
    
    Pesanan.findById(postId)
    .then(patch => {
        if(!patch){
            const err = new Error('Pesanan post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        patch.listmenu = listmenu;
        // patch.hargatotal = hargatotal;
        // patch.statuspesanan = statuspesanan;

        return patch.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.patchNomorMeja = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const nomormeja = req.body.nomormeja;
    // const hargatotal = req.body.hargatotal;
    // const statuspesanan = req.body.listmenu.statuspesanan;
    const postId = req.params.postId;
    
    Pesanan.findById(postId)
    .then(patch => {
        if(!patch){
            const err = new Error('Pesanan post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        patch.nomormeja = nomormeja;
        // patch.hargatotal = hargatotal;
        // patch.statuspesanan = statuspesanan;

        return patch.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.patchHargaTotal = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    // const nomormeja = req.body.nomormeja;
    const hargatotal = req.body.hargatotal;
    // const statuspesanan = req.body.listmenu.statuspesanan;
    const postId = req.params.postId;
    
    Pesanan.findById(postId)
    .then(patch => {
        if(!patch){
            const err = new Error('Pesanan post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        // patch.nomormeja = nomormeja;
        patch.hargatotal = hargatotal;
        // patch.statuspesanan = statuspesanan;

        return patch.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err)
    })
}

//ENDPOINT 4 : GET Pesanan By Id => 
exports.getPesananById = (req, res, next) => {
    const postId = req.params.postId;
    Pesanan.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Pesanan dengan ID tersebut tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json(
            {
                message : 'Get Pesanan By Id Success',
                data: result
            }
        );
    })
    .catch(err => {
        next(err);
    })
}