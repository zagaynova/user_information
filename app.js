var express = require( 'express' )

const pug = require('pug');
var bodyParser = require('body-parser'); //for post request routes
var fs = require("fs");

const app = express()

app.use(bodyParser.urlencoded({ extended: true })); 

const searchBarPage = pug.compileFile('./views/searchbar.pug'); //form with pug
const addUserPage = pug.compileFile('./views/adduser.pug'); 
const allUsersPage = pug.compileFile('./views/allusers.pug'); 

var users = JSON.parse( fs.readFileSync("users.json") ); //van string in .json file naar array for all users list

function findUser(name) { //http://twitter.github.io/typeahead.js/examples/
	var result = "";
	for (var i = 0; i < users.length; i++) { //search in var users
		if (users[i].firstname.toLowerCase() == name.toLowerCase() || users[i].lastname.toLowerCase() == name.toLowerCase()) {
			result += users[i].firstname + " ";
			result += users[i].lastname + ", ";
			result += users[i].email;
		}
	}
	return result;
}

function arrayOfAllUsers(){
	var result = [];
	for (var i = 0; i < users.length; i++) {
		var user = users[i].firstname + " " + users[i].lastname + ", " + users[i].email
		result.push(user);
	}
	return result;
}
var iu = 8009;

function addUser(firstname, lastname, email){
	var newUser = {
		"firstname": firstname,
		"lastname": lastname,
		"email": email
	};
	users.push(newUser);
	var jsonString = JSON.stringify(users, null, "\t");
	fs.writeFile("users.json", jsonString, 'utf8', null);
}

app.get('/route1', (request, response) => {
    console.log('request.query is: ', request.query)
	// response.send(showAllUsers())
	response.send(allUsersPage({"users": arrayOfAllUsers()}))
});

app.get('/route2', (request, response) => {
    console.log('request.query is: ', request.query)
	response.send(searchBarPage())
});

app.post('/route3', (request, response) => {
    console.log('request.query is: ', request.query)
    // console.log(request.body.name) //which user is searched for
	response.send(searchBarPage({"searchresult": findUser(request.body.name)}))
});

app.get('/route4', (request, response) => {
    console.log('request.query is: ', request.query)
	// response.sendfile('adduser.html') //html ipv pug
	response.send(addUserPage())
});

app.post('/route5', (request, response) => {
    console.log('request.query is: ', request.query)
    addUser(request.body.firstname, request.body.lastname, request.body.email)
	response.redirect('/route1')
});

const listener = app.listen(80, () => {
    console.log('server has started at ', listener.address().port)
})

/*
// Compile the source code
const compiledFunction = pug.compileFile('template.pug');


// Render a set of data
console.log(compiledFunction({
  name: 'Timothy'
}));
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({
  name: 'Forbes'
}));
// "<p>Forbes's Pug source code!</p>"


//Search for users
var fs = require("fs");
var users = JSON.parse( fs.readFileSync("users.json") );
for (var i = 0; i < users.length; i++) {
	if (users[i].firstname == process.argv[2]) {
		console.log(users[i].firstname);
		console.log(users[i].lastname);
		console.log(users[i].email);
	}
}
//Am I working?
var writeSuccess = function() {
	console.log("Json bestand schrijven is gelukt");
}
//Add new user
var nieuweGebruiker = {
	"firstname": "Oooh",
	"lastname": "Hoo",
	"email": "ohho@mail.com"
};
users.push(nieuweGebruiker);
var jsonString = JSON.stringify(users, null, "\t");
fs.writeFile("toegevoegd.json", jsonString, 'utf8', writeSuccess);

sayhellootje( process.argv[2] )// Hello, I am Peter

*/