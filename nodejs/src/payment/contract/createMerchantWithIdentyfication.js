let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectJsSdk.FileCache();
file_cache.dirName = __dirname + '/../../../tmp/';
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectJsSdk.PaymentContractsApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let contact = new SecuconnectJsSdk.Contact();
contact.forename = 'John';
contact.surname = 'Doe';

let address = new SecuconnectJsSdk.Address();
address.type = 'invoice';
address.street = 'example street';
address.street_number = '6a';
address.postal_code = '01234';
address.city = 'Testcity';
address.country = 'DE';

contact.address = address;

contact.salutation = 'Mr';
contact.title = 'Dr.';
contact.gender = 'm';
contact.url_website = 'example.com';
contact.birthplace = 'AnotherExampleCity';
contact.nationality = 'german';

payout_account = new SecuconnectJsSdk.PaymentInformation();
payout_account.iban = 'DE89370400440532013000';
payout_account.bic = '';
payout_account.owner = 'Test #1';

let request_data = new SecuconnectJsSdk.PaymentContractsDTORequestId();
request_data.contact = contact;
request_data.payin_account = false;
request_data.payout_account = payout_account;
request_data.project = 'project_name ' + Math.floor(new Date().getTime() / 1000);

api_instance.requestId('me', request_data).then((createdPaymentContract) => {
    console.log('Created payment contract. Contract data: ');
    console.info(createdPaymentContract);
}, function (error) {
    console.error(error);
});
