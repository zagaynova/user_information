var express = require( 'express' )
var sayhellootje = require( './sayhello' )

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
var jsonString = JSON.stringify(users, null, "\n");
fs.writeFile("toegevoegd.json", jsonString, 'utf8', writeSuccess);

sayhellootje( process.argv[2] )// Hello, I am Peter

