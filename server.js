// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js')

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middlewarew & BODY PARSER
app.use(express.urlencoded({extended: true}));

// SEED DATA

// Routes / Controllers
// Seed
const bookSeed = require('./models/bookSeed.js');

app.get('/books/seed', (req, res) => {
	Book.deleteMany({}, (error, allBooks) => {});

	Book.create(bookSeed, (error, data) => {
		res.redirect('/books');
	});
});

// Routes / Controllers
// Seed
// app.get('/books/seed', (req, res) => {
//     Book.deleteMany({}, (error, allBooks) => {});

//     Book.create(
//         [{
//                 title: 'Cracking the Coding Interview',
//                 author: 'Gayle Laakmann McDowell',
//             },
//             {
//                 title: 'HTML and CSS: Design and Build Websites',
//                 author: 'Jon Duckett',
//             },
//             {
//                 title: 'JavaScript and JQuery: Interactive Front-End Web Development ',
//                 author: 'jon Duckett',
//             },
//             {
//                 title: "You Don't Know JS Yet",
//                 author: 'Kyle Simpson',
//             },
//             {
//                 title: 'Design Patterns: Elements of Reusable Object-Oriented Software ',
//                 author: 'Erich Gamma',
//             },
//             {
//                 title: 'Frontend Unicorn',
//                 author: 'Michał Malewicz, Szymon Adamiak, Albert Pawłowski, and Albert Walicki',
//             },
//             {
//                 title: "Don't Make Me Think",
//                 author: 'Steve Krug',
//             },
//         ],
//         (error, data) => {
//             res.redirect('/books');
//         }
//     );
// });

//ROUTES
// INDEX
app.get('/books', (req, res) => {
	Book.find({}, (error, allBooks) => {
		res.render('index.ejs', {
			books: allBooks,
		});
	});
});

// NEW
app.get('/books/new', (req,res) => {
    res.render('new.ejs');
})
// D
// U
//CREATE
app.post('/books', (req, res) => {
    
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }

    Book.create(req.body, (error, createdBook) => {
		res.redirect('/books');
    })

    res.send(req.body);
})
// E

// SHOW
app.get('/books/:id', (req, res) => {
	Book.findById(req.params.id, (err, foundBook) => {
		res.render('show.ejs', {
			book: foundBook,
		});
	});
});

// Listenser                                                          
const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Andre are you listening to: ${PORT}`)
})
 