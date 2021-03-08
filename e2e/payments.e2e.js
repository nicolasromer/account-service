const axios = require('axios')
const crypto = require('crypto')

const accountsUrl = 'http://localhost:8000';

console.log(`
________________________
Running End to End tests
________________________
`)

async function testHealth() {
    console.log("TEST: /health returns 200");

    const response = await axios.get(`${accountsUrl}/health`);

    console.log(
        response.status === 200
            ? 'PASS'
            : `FAIL: /health returned code ${response.status}`
    );
}

async function testCreateAccount() {
    console.log("TEST: /create returns 201 with created account");

    const url = `${accountsUrl}/`;

    const json = {
        customerId: crypto.randomUUID(),
        initialCredit: 0,
    }

    let response;
    try {
        response = await axios.post(url, json);
    } catch (e) {
        console.log('ERROR: ', e);
        return;
    }

    console.log(
        response.status === 201
            ? 'PASS'
            : `FAIL: /create returned code ${response.status}`
    );

    console.log(
        response.data.customerId === json.customerId
        && response.data.balance === 0
        ? 'PASS'
        : 'FAIL: returned entity is incorrect'
    )
}

async function testCreatingDuplicateAccountReturns400() {
    console.log("TEST: /create returns 400 with duplicate account creation");

    const url = `${accountsUrl}/`;

    const json = {
        customerId: crypto.randomUUID(),
        initialCredit: 0,
    }

    try {
        await axios.post(url, json);
    } catch (e) {
        console.log('ERROR: ', e);
        return;
    }

    try {
        await axios.post(url, json);
    } catch (e) {
        console.log(
            e.response.status === 400
            ? 'PASS'
            : `FAIL: unexpected error response ${e.response.status}`
        );
        return;
    }

    console.log('FAIL: creating duplicate accounts succeeded');
}

async function testCreateAccountWithCredit() {
    console.log("TEST: /create returns 201 with credited account");

    const url = `${accountsUrl}/`;

    const json = {
        customerId: crypto.randomUUID(),
        initialCredit: 100,
    }

    let response;
    try {
        response = await axios.post(url, json);
    } catch (e) {
        console.log('ERROR: ', e);
        return;
    }

    console.log(
        response.status === 201
            ? 'PASS'
            : `FAIL: /create returned code ${response.status}`
    );

    console.log(
        response.data.customerId === json.customerId
        && response.data.balance === 0
            ? 'PASS'
            : 'FAIL: returned entity is incorrect'
    )
}

async function run() {
    await testHealth();
    await testCreateAccount();
    await testCreatingDuplicateAccountReturns400();
}

run()

