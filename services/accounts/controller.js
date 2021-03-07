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
    requesto.getPostData(request, response, body => {

        if (!body.customerId) {
            return requesto.badRequest(response, "customerId is required in the request");
        }

        console.log('creating account for customer: ', body);

        const account = repository.create(body.customerId);

        console.log(account);

        if (body.initialCredit > 0) {
            transactionService.create(account.id, body.initialCredit, response => {
                console.log(response);
            });
        }

        return requesto.created(response, 'created account for customer')
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

    const customer = customerService.get(account.customerId);
    const transactions = transactionService.getForAccount(accountId);

    const result = transformAccount(customer, account, transactions);

}

module.exports = { createAccount, getAccount, healthCheck };