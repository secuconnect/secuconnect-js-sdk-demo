let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let fileCache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(fileCache);

let paymentTransactionsApi = new SecuconnectJsSdk.PaymentTransactionsApi();
paymentTransactionsApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

// FIRST STEP: get the "trans_id" of the parent transaction
let paymentId = 'kfycfrskphjg3468286';
let query = 'transaction_hash:' + paymentId;

paymentTransactionsApi.getAll(
    1,
    null,
    ['trans_id', 'id'],
    query
).then(paymentTransactions => {
    console.info(paymentTransactions);

    if (paymentTransactions.data && paymentTransactions.data[0] && paymentTransactions.data[0].trans_id) {
        let parentTransId = paymentTransactions.data[0].trans_id;

        console.log('The TA-CODE (trans_id) of the parent is: ' + parentTransId);
        console.log('You can call the details now by using this id: "' + paymentTransactions.data[0].id + '"');

        // SECOND STEP: get all transactions which have this id as parent.
        let query2 = 'parents.trans_id:' + parentTransId;

        paymentTransactionsApi.getAll(
            10,
            null,
            null,
            query2
        ).then(paymentTransactions2 => {
            console.info(paymentTransactions2);
        }, error => {
            console.info(error.response.body);
            console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
        });
    }

}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
