# account-service

This exposes an API to create an account for a user, and initialize a transaction if necessary. 

Internally the Account service communicates with a Transactions service to fulfill credit orders.

## Running locally
- `docker-compose up` will bring up the services.
- account service can be reached on port `8000`

- `node services/accounts/app.js` will bring up the accounts container alone.
- you can test account creation with `curl -X POST http://localhost:5000/account -d '{"customerId": 50}'` 