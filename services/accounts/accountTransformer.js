
module.exports = (account) => {
    return {
        id: account.id,
        customerId: account.customerId,
        balance: account.balance,
    }
}