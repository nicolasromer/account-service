const Account = require('./Account.js');

const database = {};

const read = (accountId) => {
    return { ...database[accountId] };
}

const findOne = ({customerId}) => {
    const result = Object.keys(database).filter(key => database[key].customerId === customerId);
    return result.length ? { ...result } : null;
}

const create = (customerId) => {
    const exists = findOne({ customerId });

    if (exists) {
        return true;
    }

    const account = new Account(customerId);

    database[account.id] = account;

    return { ...account };
}

const addCredit = (accountId, cents) => {
    database[accountId].credit(cents);

    return { ...database[accountId] }
}

module.exports = {
    create,
    read,
    findOne,
    addCredit
}