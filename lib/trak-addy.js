var _ = require('underscore');
var request = require('request');
var baseURL = "https://trak.addy.co/api/v1";

// to get your api key, run the createApiKey.js script (read comments there for params).  
// i keep mine in a .env file at my app root and use the nifty 'dotenv' library to read it. keep your key private.
function setOptions(endpoint) {
	var options = {
		url: baseURL + endpoint,
		headers: {
			'trak-api-key': 'YOUR_TRAK_API_KEY'
		},
		json: true
	};

	return options;
}

function mapStatus(status) {
	switch (status) {
		case 0:
			return "Job is in a bad state and should be repaired";
			break;
		case 1:
			return "Job is not currently assigned to a driver";
			break;
		case 2:
			return "Job has been assigned to a driver"
			break;
		case 3:
			return "Job has been started and is currently active";
			break;
		case 4:
			return "Job has been completed";
			break;
		default:
			return "Unknown Status";
	}
}

exports.mapStatus=mapStatus;
exports.jobs = {
	create: function(recipients, address, destination, scheduledTime, pickupAddress) {
		console.log('creating job');
		var options = setOptions("/jobs");
		//these params required for all requests
		options.body = {
			"recipients": recipients,
			"address": address,
		}

		//these params optional
		if (destination) options.body.destination = destination;
		if (scheduledTime) options.body.scheduledTime = scheduledTime;
		if (pickupAddress) options.body.pickupAddress = pickupAddress;

		// options.body = {
		// 	"recipients": [{
		// 		"phone": "877-764-8725",
		// 		"name": "Addy Dev Team",
		// 		"notes": "Order: 48 beef empanadas, lots of chimichurri, 36oz Ritual single origin espresso beans, 750ml 2009 Rioja x 5, Super Tres Leches x 3"
		// 	}, {
		// 		"phone": "415-233-7011",
		// 		"name": "Real-time Computing Club",
		// 		"notes": "Chilling with the Addy guys for the evening, eating their goodies, deliver to The Valley conference room."
		// 	}],
		// 	"address": {
		// 		"number": "620",
		// 		"street": "Folsom Street",
		// 		"apartment": "Suite 100",
		// 		"city": "San Francisco",
		// 		"state": "CA",
		// 		"country": "USA"
		// 	},
		// 	"scheduledTime": 1396559183915,
		// 	"pickupAddress": {
		// 		"number": "399",
		// 		"street": "4th St",
		// 		"city": "San Francisco",
		// 		"state": "CA",
		// 		"country": "USA",
		// 		"postalCode": "94107"
		// 	}
		// }
		request.post(
			options,
			function(error, response, body) {

				if (!error && response.statusCode == 200) {

					console.log('create job body is:', body)
				} else if (error) {
					console.log('error creating job', error)
				} else {
					console.log('something else wrong when creating job', response)
				}
			}
		);

	},
	find: function(jobID) {

		var options = setOptions('/job/' + jobID);
		console.log('finding job', options)
		request(options,
			function(error, response, body) {

				if (!error && response.statusCode == 200) {
					console.log('found job: ', body);
					return body
				} else if (error) {
					console.log('error finding job', error)
				} else {
					console.log('something else wrong when finding job', response)
				}
			})
	},
	update: function(jobID, paramsToUpdate) {
		//params is a JSON object containing the same fields when you create a job i.e. address, driver, etc.
		console.log('updating job');
		var options = setOptions('/job/' + jobID);
		options.body = paramsToUpdate;
		request.put(
			options,
			function(error, response, body) {

				if (!error && response.statusCode == 200) {
					console.log('update job body is:', body)
					return body
				} else if (error) {
					console.log('error updating job', error)
				} else {
					console.log('something else wrong when updating job', response)
				}
			}
		);

	},
	list: function(callback) {
		var options = setOptions('/jobs');
		console.log('listing job');
		request(options,
			function(error, response, body) {
				if (!error && response.statusCode == 200) {

					var parsedJobs = [];
					_.each(body, function(job) {
						job.statusText = mapStatus(job.status);
						parsedJobs.push(job);
					})
					console.log('list of parsed jobs is: ', parsedJobs);
					//do something with the parsed jobs.
					if(callback) callback();
					return parsedJobs
				}
			})
	},
	delete: function(jobID) {
		console.log('deleting job');

		var options = setOptions('/job/' + jobID);
		console.log('finding job', options)

		request.del(options,
			function(error, response, body) {

				if (!error && response.statusCode == 200) {
					console.log('deleted job: ', body);
					return body
				} else if (error) {
					console.log('error deleting job', error)
				} else {
					console.log('something else wrong when deleting job', response)
				}
			})
	}
}
exports.drivers = {

	list: function(callback) {
		console.log('listing drivers');
		var options = setOptions('/drivers');
		request(options,
			function(error, response, body) {
				if (!error && response.statusCode == 200) {


					var parsedDrivers = [];
					_.each(body, function(driver) {
						parsedDrivers.push(driver);
					});
					console.log('parsed drivers is ', parsedDrivers);
					if(callback) callback();
					return parsedDrivers
				}
			})
	}
}
exports.authentication = {
	createKey: function(email, password, keyname, callback) {
		console.log('creating key');
		var options = setOptions('/auth/keys');
		options.body = {};
		options.body.email = email;
		options.body.password = password;
		options.body.name = keyname;
		request.post(options,
			function(error, response, body) {
				if (!error && response.statusCode == 200) {

					if(callback) callback(body);
				} else {

					if(callback) callback(response.body)
				}
			})
	}
}