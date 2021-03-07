const repository = require('./repository.js');
const requesto = require('./requesto.js')
const transactionService = require('./transactionService.js');

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

        return requesto.success(response, 'created account for customer')
    })
}

module.exports = { createAccount, healthCheck };