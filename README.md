# payments domain

This exposes an API to create an account for a user, and initialize a transaction if necessary.

We're missing some knowledge to finish the design, so a lot of imagination went into the specs. Many things are just stubs or mockups. My main goal here was to get a good local environment working with multiple services, and keep services completely decoupled and lightweight.

Internally the Account service communicates with a Transactions service to fulfill credit orders.

## Account service layers
1. `app.js` is the entrypoint, which kicks off the server
2. `server.js` sends requests to the router, and finally catches errors from the rest of the app. 
3. `router.js` decides whether a request is valid based on url and http verb, and pipes request to the correct controller method. It also parses url arguments.
4. `controller.js` handles the high-level business logic. for the request, and handles responses and more detailed errors.
5. `repository.js` handles the details of storing and updating accounts in memory. It's the interface for our persistence mechanism.
6. `Account.js` represents our Account entity. it contains uuid generation logic and structures the data stored. It uses class syntax to remind us that it is mutated.

## Running locally
- `docker-compose up` will bring up the services.
- `make build` will install deps needed for testing
- `make test` will run some e2e tests against the docker network
- you can view the UI rough draft running at `http://localhost:8001/`

### TODO: accounts service
tests to write:

account creation with credit:
`curl -X POST http://localhost:8000/account -d '{"customerId": 5, "initialCredit":100}'`
expect: `success user created, balance 0` (until the payment succeeds)

create and then fetch account:
`curl -X POST http://localhost:8000/account -d '{"customerId": 50}'`
take account ID from response
`curl http://localhost:8000/account/{accountId}`
expect:
```json
{
  "name": "van Gouda",
  "surname": "Kaas",
  "balance": 0,
  "transactions": [
    {
      "amount": 100,
      "status": "pending"
    }
  ]
}
```