const Account = require('./Account.js');

const database = {};

const create = (customerId) => {
    const account = new Account(customerId);

    database[account.uuid] = account;

    return account;
}

const addCredit = (customerId, cents) => {
    if (!database[customerId]) {
        throw new Error('customer not found');
    }

    database[customerId].credit(cents);

    return database[customerId];
}

module.exports = {
    create,
    addCredit
}