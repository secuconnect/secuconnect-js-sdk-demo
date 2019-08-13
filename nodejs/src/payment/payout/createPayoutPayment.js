let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectJsSdk.PaymentSecupayPayoutApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

transaction = new SecuconnectJsSdk.SecupayPayoutDTO();
transaction.demo = false;
transaction.currency = 'EUR';
transaction.contract = 'PCR_2MK6EM4NE2N72XCGN0ZAV5207TH9AY';
transaction.redirect_url = new SecuconnectJsSdk.SecupayRedirectUrl();
transaction.redirect_url.url_push = 'https://api.example.com/secuconnect/push';
transaction.purpose = 'Payout Test #1';
transaction.order_id = '201900123';

transaction.customer = 'PCU_WK2DUNC8U2N72XBV70ZAV5207TH9AH';
listItem1 = new SecuconnectJsSdk.SecupayTransactionListItem();
listItem1.reference_id = '2000.1';
listItem1.name = 'Payout Purpose 1';
listItem1.transaction_hash = 'hppbfplzdkzy3472363';
listItem1.total = 100; // in euro-cent
listItem2 = new SecuconnectJsSdk.SecupayTransactionListItem();
listItem2.reference_id = '2000.2';
listItem2.name = 'Payout Purpose 2';
listItem2.container_id = 'PCT_2PAYNDWCE2N72XC8N0ZAV5207TH9AK';
listItem2.total = 200; // in euro-cent
listItem3 = new SecuconnectJsSdk.SecupayTransactionListItem();
listItem3.reference_id = '2000.3';
listItem3.name = 'Payout Purpose 3';
listItem3.transaction_id = 'PCI_DSVJBYCJG9X0GBMV8JCXMH4A28KKN8';
listItem3.total = 50; // in euro-cent
transaction.transaction_list = [
    listItem1,
    listItem2,
    listItem3
];
// calculate the amount
let amount = 0;
transaction.transaction_list.forEach((item) => {
    amount += item.total;
});

transaction.amount = amount; // in euro-cent

api_instance.paymentSecupaypayoutPost({"body": transaction}).then((createdPayoutPayment) => {
    console.log('Created payout payment. Payout payment data: ');
    console.info(createdPayoutPayment);
}, (error) => {
    console.error(error);
});
