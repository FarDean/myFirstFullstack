const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});
// the name of the table:
module.exports = mongoose.model('Author', authorSchema)

// this should be imported to the routes folder