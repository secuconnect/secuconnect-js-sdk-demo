let SecuconnectSDK = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectSDK.Authenticator(
    SecuconnectSDK.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectSDK.FileCache();
file_cache.dirName = __dirname + '/../../../tmp/';
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectSDK.PaymentCustomersApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let customerContact = new SecuconnectSDK.Contact();
customerContact.salutation = 'Mr.';
customerContact.title = 'Dr.';
customerContact.forename = 'John';
customerContact.surname = 'Doe';
customerContact.companyname = 'Example Inc.';
customerContact.gender = 'm';
customerContact.dob = '1901-02-03';
customerContact.url_website = 'example.com';
customerContact.birthplace = 'AnotherExampleCity';
customerContact.nationality = 'german';
customerContact.email = 'example123@example.com';
customerContact.phone = '0049-123-456789';

let customerContactAddress = new SecuconnectSDK.Address();
customerContactAddress.type = 'invoice';
customerContactAddress.street = 'example street';
customerContactAddress.street_number = '6a';
customerContactAddress.postal_code = '01234';
customerContactAddress.city = 'Testcity';
customerContactAddress.country = 'DE';
customerContact.address = customerContactAddress;

let customer = new SecuconnectSDK.PaymentCustomersDTO();
customer.contact = customerContact;

api_instance.paymentCustomersPost(customer).then((createdPaymentCustomer) => {
    console.log('Created payment customer. Customer data: ');
    console.info(createdPaymentCustomer);
}, function (error) {
    console.error(error);
});
