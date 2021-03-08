const repository = require('./repository.js');
const crypto = require('crypto');

console.log(`
________________________
Running account repository tests
________________________
`)


console.log("TEST: mutating fetched account does not mutate db");
const customerId = crypto.randomUUID();
const account = repository.create(customerId)
account.balance = 100000;
const storedAccount = repository.read(account.id);
console.log(
    storedAccount.balance === 0
    ? 'PASS'
    : 'FAIL: balance was mutated outside the repository'
);

console.log(`
`)
// create

// credit