const mongoose = require( "mongoose" );

const courseSchema = new mongoose.Schema( {
    coursetitle: {
        type: String,
        required: true
    },
    coursedetails: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true } );

module.exports = mongoose.model( "Course", courseSchema );