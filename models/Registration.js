const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    mobile_no: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Registration", RegistrationSchema);