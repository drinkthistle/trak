trak
====

node.js module for the trak by addy delivery management api
https://trak.addy.co/api/docs/

====

<b>install</b>

<code>npm install trak</code>

====
<b>get your api key</b>
- first you need to get your API key from trak.  
- do this by running the createApiKey.js script in the following manner, which will create a file called trakKeys.js with your key.  <code>node createApiKey.js email password nameForThisKey</code>
- copy paste this key into trak-addy.js where it says process.env.TRAK_KEY, or better yet -- populate that field from a private file instead of exposing it

====

<b>require trak in your code</b>

var trak = require('trak');

====

<b>method(parameters)</b>

- trak.jobs.list();

- trak.jobs.create(recipients, address, destination, scheduledTime, pickupAddress);

- trak.jobs.find(jobID);

- trak.jobs.update(jobID, paramsToUpdate);

- trak.jobs.delete(jobID);

- trak.drivers.list();

- trak.createKey(email,password,keyname,callback);

====

to run tests:

mocha



(2014) built by james b. pollack for thistle http://drinkthistle.com


