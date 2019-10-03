let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let fileCache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(fileCache);

let transaction = new SecuconnectJsSdk.SecupayTransactionProductDTO();
transaction.opt_data = new SecuconnectJsSdk.SecupayTransactionProductDTOOptData();
transaction.opt_data.language = 'de_DE'; // or 'en_US'

transaction.amount = 3324; // in euro-cent
transaction.currency = 'EUR';
transaction.demo = true;

transaction.redirect_url = new SecuconnectJsSdk.SecupayRedirectUrl();

let customer = new SecuconnectJsSdk.PaymentCustomersProductModel();
customer.id = 'PCU_3J2ZD5H8S2N4BCYCN0ZAV3W80X4YAH';
transaction.customer = customer;

let subscription = new SecuconnectJsSdk.SecupayTransactionProductDTOSubscription();
subscription.purpose = 'Payment for www.example.com';

// Activate the option to reuse the payment transaction (subscription / recurring payment)
transaction.subscription = subscription;

let paymentSecupayCreditcardsApi = new SecuconnectJsSdk.PaymentSecupayCreditcardsApi();
paymentSecupayCreditcardsApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

paymentSecupayCreditcardsApi.paymentSecupaycreditcardsPost({body: transaction}).then((secupayTransaction) => {
    console.info(secupayTransaction);

    if (secupayTransaction.id) {
        console.log('Subscription-ID: ' + secupayTransaction.id);
        console.log('The payer needs to open this URL: '+ secupayTransaction.redirect_url.iframe_url);
    }

    // Reuse subscription
    /*
     * As soon as a customer has successfully completed a payment,
     * it's possible to reuse the payment without the customer needs to re-enter the payment data again.
     */

    let transaction2 = new SecuconnectJsSdk.SecupayTransactionProductDTO();
    transaction2.amount = 3324;
    transaction2.currency = 'EUR';

    // Add the customer (id) which you have created before
    let customer2 = new SecuconnectJsSdk.PaymentCustomersProductModel();
    customer2.id = 'PCU_3J2ZD5H8S2N4BCYCN0ZAV3W80X4YAH';
    transaction2.customer = customer2;

    let subscription2 = new SecuconnectJsSdk.SecupayTransactionProductDTOSubscription();
    subscription2.id = 1299;

    let paymentSecupayCreditcardsApi = new SecuconnectJsSdk.PaymentSecupayCreditcardsApi();
    paymentSecupayCreditcardsApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();
    paymentSecupayCreditcardsApi.paymentSecupaycreditcardsPost({body: transaction2}).then((secupayTransaction2) => {
        console.info(secupayTransaction2);
    }, error => {
        console.info(error.response.body);
        console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
    })
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
