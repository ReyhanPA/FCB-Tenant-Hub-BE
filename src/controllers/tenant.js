const {validationResult} = require('express-validator');
const TenantPost = require('../models/tenant');
const path = require('path')
const fs = require('fs')

exports.loginTenant = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const check = await TenantPost.findOne({username:username})
        if(check){
            if(password == check.password){
                res.json({"message" : "Login Berhasil", "data" : check})
            } else {
                res.json("password yang anda masukkan salah")
            }
        } else {
            res.json("username yang anda masukkan salah")
        }
    } catch (e) {
        console.log(e);
    }
    
}
exports.createTenant = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.statusCode = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Gambarnya upload dulu yang brow (jpg, png, jpeg)');
        err.statusCode = 422;
        throw err;
    }

    const namatenant = req.body.namatenant;
    const image = req.file.path;
    const username = req.body.username;
    const password = req.body.password;

    const checkusername = await TenantPost.findOne({username:username})
    const checknamatenant = await TenantPost.findOne({namatenant:namatenant})
    if (!checkusername && !checknamatenant) {
        const Posting = new TenantPost({
            namatenant: namatenant,
            image: image,
            username: username,
            password: password
        }); 
    
        Posting.save()
        .then(result => {
            res.status(201).json(
                {
                    message: 'Berhasil menambahkan tenant',
                    data: result
                }
            );
        })
        .catch(err => {
            next(err);
        });
    } else {
        res.json("Username atau nama tenant sudah ada")
    }

}

exports.getAllTenant = (req, res, next) => {
    TenantPost.find()
    .then(result => {
        res.status(200).json(
            {
                message: 'Berhasil menampilkan tenant',
                data: result
            }
        );
    })
    .catch(err => {
        next(err);
    });
}

exports.getTenantById = (req,res,next) => {
    const postId = req.params.postId;
    TenantPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Tenant Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json(
            {
                message: 'Data tenant berhasil ditampilkan',
                data: result
            }
        );
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteTenant = (req, res, next) => {
    const tenantid = req.params.postId;

    TenantPost.findById(tenantid)
    .then(post => {
        if (!post) {
            const error = new Error('Tenant tidak ditemukan');
            error.errorStatus = 404; 
            throw error;
        }

        removeImage(post.image);
        return TenantPost.findByIdAndDelete(tenantid);
    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Tenant Berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath).replace(/\\/g, '\\');;

    fs.unlinkSync(filePath)
}