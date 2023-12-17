const validationResult = require('express-validator').validationResult;
const KasirPost = require('../models/auth');

exports.createKasir = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.statusCode = 400;
        err.data = errors.array();
        throw err;
    }

    const username = req.body.username;
    const password = req.body.password;

    try {
        const check = await KasirPost.findOne({username:username})
        if(!check){
            const Posting = new KasirPost({
                username: username,
                password: password
            });
        
            Posting.save()
            .then(result => {
                res.status(201).json(
                    {
                        message: 'Berhasil menambahkan kasir',
                        data: result
                    }
                );
            })
            .catch(err => {
                next(err);
            });
        }  else {
            res.json("Kasir dengan username tersebut sudah ada" )
        }
    } catch(e) {
        console.log(e);
    }
}

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const check = await KasirPost.findOne({username:username})
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