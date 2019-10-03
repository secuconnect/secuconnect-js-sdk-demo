let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let fileCache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(fileCache);

let paymentContractsApi = new SecuconnectJsSdk.PaymentContractsApi();
paymentContractsApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let payout_account = new SecuconnectJsSdk.PaymentInformation();
payout_account.iban = 'DE89370400440532013000';
payout_account.bic = '';
payout_account.owner = 'Test #1';

let request_data = new SecuconnectJsSdk.PaymentContractsDTOClone();
request_data.payin_account = false;
request_data.payout_account = payout_account;
request_data.project = 'project_name ' + Math.floor(new Date().getTime() / 1000);

paymentContractsApi.clone('me', request_data).then((createdPaymentContract) => {
    console.log('Created payment contract. Contract data: ');
    console.info(createdPaymentContract);
}, function (error) {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
