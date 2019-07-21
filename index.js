const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const members = require('./members');

const app = express();

/*
The following variable is a middleware. 
A middleware takes as arguments the request object, the result object and the next object. 
After processing the request object, it returns the result object modified and enables the next object in the middleware stack
To view the result here in the server output screen, execute curl -G http://localhost:5000/<anything>
*/

const logger = require('./middleware/logger');

// Initialize middleware
// Custom logger middelware
app.use(logger);

// Handlebars middelware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// This, since it is placed here, it will overwrite the mention of app.get('/' below) in the static folder
// This will use the handlebars engine ==> index.handlebars!
// Of course you can have still the static folder and the or the rest of the endpoints mentioned in here.
app.get('/', (req, res) => res.render('index',{  //first argument -> ./views/index.handlebars
    title: 'Member App', // this way you send content into the first argument
    members
}))

// Body parser middleware, allows you to parse the body of an incoming request
// In newer versions of express you don't need to import it as a 3rd party library
app.use(express.json()); // Allows to handle raw json files
app.use(express.urlencoded({extended: false})); // Allows to handle urlencoded data, useful for form submissions - see https://www.w3schools.com/tags/ref_urlencode.asp

/*
You can use the "res.send" but the limitations are obvious - you don'.t even use a file.
Go to localhost:5000/badExample
*/

app.get('/badExample',(req,res) => {
    res.send('<h1>Hello World!</h1>')
});

/*
Standard operation in order to join current dir and ./public/index.html
This is better than above but continues to be not ideal because you have to add every route path to every file you expose.
Go to localhost:5000/slightlyBetterExample
*/

app.get('/slightlyBetterExample', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Instead if you set the public folder a static folder (as you might actually want to, so that all html, css and images for a static server) then you can do the following

// Set static folder
// Test the endpoint below by going to localhost:5000/about.html when server is running
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/members', require('./routes/api/memberscontroller')); // Parent route, file handling the relative routes 

const PORT = process.env.PORT || 5000; // when we deploy we check first the port of the process that might be different from 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
