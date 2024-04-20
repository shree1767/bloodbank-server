const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
},{ collection: 'donors' });

module.exports = mongoose.model('Data', dataSchema);
