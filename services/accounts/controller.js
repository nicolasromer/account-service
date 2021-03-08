const repository = require('./repository.js');
const requesto = require('./requesto.js')
const transactionService = require('./transactionService.js');
const customerService = require('./customerService.js');
const transformAccount = require('./accountTransformer.js');

/**
 * Check that this service is up
 * @param request
 * @param response
 */
const healthCheck = (request, response) => requesto.success(response,'very healthy! must be working out');

/**
 * Create a payments account for a customer
 * @param request
 * @param response
 */
const createAccount = (request, response) => {
    requesto.getPostData(request, response, ({ customerId, initialCredit }) => {

        if (!customerId) {
            return requesto.badRequest(response, "customerId is required in the request");
        }

        if (repository.findOne({ customerId })) {
            return requesto.badRequest(response, "an account for this customer already exists");
        }

        console.log('creating account for customer: ', customerId);

        const account = repository.create(customerId);

        console.log(account);

        if (initialCredit > 0) {
            transactionService.create(account.id, initialCredit, response => {
                console.log(response);
            });
        }

        return requesto.created(response, transformAccount(account))
    })
}

/**
 * Get an Account
 */
const getAccount = (response, accountId) => {
    const account = repository.read(accountId);

    if (!account) {
        return requesto.notFound(response, 'No such account');
    }

    return requesto.success(response, transformAccount(account));
}

module.exports = { createAccount, getAccount, healthCheck };