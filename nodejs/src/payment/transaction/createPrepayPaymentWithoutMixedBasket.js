let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectJsSdk.PaymentSecupayPrepaysApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let transaction = new SecuconnectJsSdk.SecupayTransactionProductDTO();
transaction.opt_data = new SecuconnectJsSdk.SecupayTransactionProductDTOOptData();
transaction.opt_data.language = 'de_DE'; // or 'en_US'
transaction.amount = 3324; // in euro-cent
transaction.currency = 'EUR';
transaction.demo = true;
transaction.accrual = true;

transaction.customer = new SecuconnectJsSdk.PaymentCustomersProductModel();
transaction.customer.id = 'PCU_24UARHBMA2NAZMN070ZAV9BX484PAW';

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
transaction.basket = [ basketItem1, basketItem2];

api_instance.paymentSecupayprepaysPost({"body": transaction}).then((createdPrepayPayment) => {
    console.log('Created prepay payment. Prepay payment data: ');
    console.info(createdPrepayPayment);
},(error) => {
    console.error(error);
});
