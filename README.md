# qf

Notes on the QF web application

To start the server, you'll obviously have to have node.js installed.

Then you can either use node directly:

	node server.js

Or use npm:

	npm start

Check http://localhost:8080/ to get a confirmation home page.


To run the in-built tests, use npm:

	npm test

You can then use a tool such as SoapUI to test posting JSON requests to the application at http://localhost:8080/flights
	
There's a SoapUI project here that contains a sample request:

	test/QF-Project-soapui-project.xml
	