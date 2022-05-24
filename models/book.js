//Required Dependecies
const mongoose = require('mongoose')

//Bluepring
const bookSchema = new mongoose.Schema({
    title: { type: String, required:true},
    author: {type: String, reuqired:true},
    completed: Boolean,
})

// Variable to Hold Data From Schema
const Book = mongoose.model('Book', bookSchema);

// Export book schema data
module.exports = Book;