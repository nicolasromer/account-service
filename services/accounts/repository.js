const Account = require('./Account.js');

const database = {};

const create = (customerId) => {
    const exists = Object.keys(database).filter(key => database[key].customerId === customerId).length;

    if (exists) {
        throw new Error('account for this customer already exists')
    }

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