const Account = require('./Account.js');
const crypto = require('crypto');

console.log(`
________________________
Running Account class tests
________________________
`)

console.log('TEST: creating account works');
const customerId = crypto.randomUUID();
const account = new Account(customerId);
console.log(
    account.id
    && account.balance === 0
    && account.customerId === customerId
    ? 'PASS'
    : 'FAIL: new account is not what I expected.'
)