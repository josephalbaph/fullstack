2.11: The Phonebook Step6

We continue with developing the phonebook. Store the initial state of the application in the file db.json, which should be placed in the root of the project.

Start json-server on port 3001 and make sure that the server returns the list of people by going to the address http://localhost:3001/persons in the browser.

Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.
