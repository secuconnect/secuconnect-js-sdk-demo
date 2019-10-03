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

let query = 'incoming_payment_date:*';
let sort = 'incoming_payment_date:desc';

paymentTransactionsApi.getAll(
    10, // for test limit the result
    null,
    null,
    query,
    sort
).then((paymentTransactions) => {
    console.info(paymentTransactions);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
