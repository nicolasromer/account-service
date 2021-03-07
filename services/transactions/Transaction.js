const crypto = require('crypto');

class Account {
    id;
    accountId;
    amount;
    status; // pending | complete | failed
    message = '';

    constructor(accountId, amount) {
        this.id = this.uuid();
        this.accountId = accountId;
        this.amount = amount;
        this.status = 'queued';
    }

    pending() {
        this.status = 'pending';
    }

    fail(message) {
        this.status = 'failed';
        this.message = message;
    }

    complete() {
        this.status = complete;
        this.message = '';
    }

    uuid() {
        return crypto.randomUUID()
    }
}

module.exports = Account;