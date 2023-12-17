// Import library
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TenantPost = new schema({
    namatenant: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TenantPost', TenantPost);