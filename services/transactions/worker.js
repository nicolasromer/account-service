const repository = require('./repository.js');
const adyenService = require('./adyenService.js');
const accountService = require('./accountService.js');

const performTransaction = (transactionJob) => {
    const {transactionId} = transactionJob;

    const transaction = repository.read(transactionId);

    // assuming here we got authorization from bank when collecting payment details from the user
    const paymentMethod = accountService.getPaymentMethod(transaction.accountId)

    adyenService.requestFunds(paymentMethod.IBAN, transaction.amount, transactionId);

    repository.setAsPending(transactionId);
}

module.exports = {
    performTransaction
}