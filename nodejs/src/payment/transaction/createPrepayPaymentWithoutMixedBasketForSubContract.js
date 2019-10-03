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
transaction.accrual = true;

transaction.redirect_url = new SecuconnectJsSdk.SecupayRedirectUrl();

transaction.contract_id = 'PCR_XJH365T7S2N630M7T3H58CF8HF9AAH';

let customer = new SecuconnectJsSdk.PaymentCustomersProductModel();
customer.id = 'PCU_2G68MTN7G2N48QE4N0ZAVFJH6NM8A2';
transaction.customer = customer;

let basketItem1 = new SecuconnectJsSdk.SecupayBasketItem();
basketItem1.item_type = 'shipping';
basketItem1.name = 'standard delivery';
basketItem1.tax = 19;
basketItem1.total = 1324;

let basketItem2 = new SecuconnectJsSdk.SecupayBasketItem();
basketItem2.item_type = 'article';
basketItem2.article_number = 3211;
basketItem2.quantity = 2;
basketItem2.name = 'Fancy Item XYZ';
basketItem2.ean = 4123412341243;
basketItem2.tax = 19;
basketItem2.total = 2000;
basketItem2.price = 1000;

// Platform Provision (will reduce the payout amount of the merchant)
let basketItem3 = new SecuconnectJsSdk.SecupayBasketItem();
basketItem3.item_type = 'stakeholder_payment';
basketItem3.contract_id = 'PCR_HS08HCV0V2N630M7T3H58CF9ZE2YAW'; // This id is fixed for the platform
basketItem3.name = 'Platform Provision';
basketItem3.total = 300;

transaction.basket = [basketItem1, basketItem2, basketItem3];

let paymentSecupayPrepaysApi = new SecuconnectJsSdk.PaymentSecupayPrepaysApi();
paymentSecupayPrepaysApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

paymentSecupayPrepaysApi.paymentSecupayprepaysPost({body: transaction}).then((secupayTransaction) => {
    console.info(secupayTransaction);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
