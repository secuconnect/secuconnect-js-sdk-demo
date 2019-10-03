let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let fileCache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(fileCache);

let paymentSecupayPrepaysApi = new SecuconnectJsSdk.PaymentSecupayPrepaysApi();
paymentSecupayPrepaysApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

paymentSecupayPrepaysApi.reverseAccrualByPaymentId(
    'secupayprepays', // Payment method (secupaydebits, secupayprepays, secupayinvoices, ...) (required)
    'igwibrzranbq3476703', // Payment id (required)
    new SecuconnectJsSdk.SecupayTransactionReverseAccrualDTO()
).then((secupayTransaction) => {
    console.info(secupayTransaction);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
