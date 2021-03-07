# payments domain

This exposes an API to create an account for a user, and initialize a transaction if necessary. 

Internally the Account service communicates with a Transactions service to fulfill credit orders.

## Account service layers
1. `app.js` is the entrypoint, which kicks off the server
2. `server.js` sends requests to the router, and finally catches errors from the rest of the app. 
3. `router.js` decides whether a request is valid based on url and http verb, and pipes request to the correct controller method.
4. `controller.js` handles the high-level business logic. for the request, and handles responses and more detailed errors.
5. `repository.js` handles the details of storing and updating accounts in memory. It's the interface for our persistence mechanism.
6. `Account.js` represents our Account entity. it contains uuid generation logic and structures the data stored. It uses class syntax to remind us that it is mutated.

## Running locally
- `docker-compose up` will bring up the services.
- account service can be reached on port `8000`

### accounts service
- `node services/accounts/app.js` will bring up the accounts container alone.
- you can test account creation with `curl -X POST http://localhost:5000/account -d '{"customerId": 50}'` 