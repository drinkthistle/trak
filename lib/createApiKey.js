//to use from the command line:
// node createApiKey.js email password nameForThisKey
//you should add probably add trakKeys.js to your .gitgnore

var fs = require('fs');
var trak = require('trak-addy');
var info = [];
process.argv.forEach(function(val, index, array) {
	info.push(val);
});

function callback(data) {
	fs.writeFile("./trakKeys.js", JSON.stringify(data), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("The file was saved as trakKeys.js!");
		}
	});
};

trak.authentication.createKey(info[2], info[3], info[4], callback);