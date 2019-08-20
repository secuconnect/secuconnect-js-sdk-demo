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
transaction.opt_data.language = 'de_DE';
transaction.amount = 3324;
transaction.currency = 'EUR';
transaction.demo = true;
transaction.accrual = true;
transaction.redirect_url = new SecuconnectJsSdk.SecupayRedirectUrl();
transaction.customer = new SecuconnectJsSdk.PaymentCustomersProductModel();
transaction.customer.id = 'PCU_...'; // enter payment customer ID

let subTransactionForSubContract = new SecuconnectJsSdk.SecupayBasketItem();
subTransactionForSubContract.item_type = 'sub_transaction';
subTransactionForSubContract.contract_id = 'PCR_...'; // enter contract ID
subTransactionForSubContract.total = 3324;

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

let basketItem3 = new SecuconnectJsSdk.SecupayBasketItem();
basketItem3.item_type = 'stakeholder_payment';
basketItem3.contract_id = 'PCR_...'; // enter contract ID
basketItem3.name = 'Platform Provision';
basketItem3.total = 300;

subTransactionForSubContract.sub_basket = [
    basketItem1,
    basketItem2,
    basketItem3
];

transaction.basket = [subTransactionForSubContract];

api_instance.paymentSecupayprepaysPost({"body": transaction}).then((createdPrepayPayment) => {
    console.log('Created prepay payment. Prepay payment data: ');
    console.info(createdPrepayPayment);
},(error) => {
    console.error(error);
});
