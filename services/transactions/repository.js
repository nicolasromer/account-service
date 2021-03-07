const Transaction = require('./Transaction.js')

const database = {};

const create = (accountId, amount) => {
    const transaction = new Transaction(accountId, amount);

    database[transaction.id] = transaction;

    return transaction;
}

const read = (transactionId) => {
    // copy so that it can't be mutated
    return {...database[transactionId]};
}

const setAsPending = (transactionId) => {
    database[transactionId].pending();
}

const setAsFailed = (transactionId, message) => {
    database[transactionId].fail(message);
}

const setAsComplete = (transactionId) => {
    database[transactionId].complete();
}

module.exports = {
    create,
    read,
    setAsPending,
    setAsFailed,
    setAsComplete,
}