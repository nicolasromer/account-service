const Transaction = require('./Transaction.js')

const database = {};

module.exports = {
    create: (accountId, amount) => {
        const transaction = new Transaction(accountId, amount);

        database[transaction.id] = transaction;

        return transaction;
    },
    read: (transactionId) => {
        // copy so that it can't be mutated
        return {...database[transactionId]};
    },
    getForAccount: (accountId) => {
        return Object.keys(database).filter(key => database[key].accountId === accountId);
    },
    setAsPending: (transactionId) => {
        database[transactionId].pending();
    },
    setAsFailed: (transactionId, message) => {
        database[transactionId].fail(message);
    },
    setAsComplete: (transactionId) => {
        database[transactionId].complete();
    },
}