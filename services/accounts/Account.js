const crypto = require('crypto');

class Account {
    id;
    balance = 0;
    customerId;

    constructor(customerId) {
        this.id = this.uuid();
        this.customerId = customerId;
    }

    credit(cents) {
        this.balance += cents
    }

    uuid() {
        return crypto.randomUUID()
    }
}

module.exports = Account;