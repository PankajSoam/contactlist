//require the liberary
const mongoose = require('mongoose');

//creating schema for tasks 
const contactSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});


const Contact = mongoose.model('Contact', contactSchema);

//exporting the schema
module.exports = Contact;