# account-service

This exposes an API to create an account for a user, and initialize a transaction if necessary. 

Internally the Account service communicates with a Transactions service to fulfill credit orders.

## Running locally
- `docker-compose up` will bring up the services.