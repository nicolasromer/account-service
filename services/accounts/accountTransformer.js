
module.exports = (customer, account, transactions) => {
    return {
        name: customer.name,
        surname: customer.surname,
        balance: account.balance,
        transactions,
    }
}