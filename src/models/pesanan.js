const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pesanan = new Schema({
    nomormeja: {
        type: Number,
        required: true
    },
    listmenu: {
        type: [{
            idtenant: {
                type: String,
                required: true
            },
            namatenant: {
                type: String,
                required: true
            },
            namamenu: {
                type: String,
                required: true
            },
            harga: {
                type: Number,
                required: true
            },
            jumlah: {
                type: Number,
                required: true
            },
            statuspesanan: {
                type: String,
                required: true
            },
        }],
        default: [],
    },    
    hargatotal: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Pesanan', Pesanan);