let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectJsSdk.PaymentContainersApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let container = new SecuconnectJsSdk.PaymentContainersDTO();
container.type = 'bank_account';
container.customer = new SecuconnectJsSdk.PaymentContainersDTOCustomer();
container.customer.id = 'PCU_...';
container.private = new SecuconnectJsSdk.PaymentContainersDTOPrivate();
container.private.owner = 'John Doe';
container.private.iban = '...'; // enter IBAN f.e. DE37503240001000000524
container.private.bic = '...'; // enter BIC

api_instance.paymentContainersPost(container).then((createdPaymentContainer) => {
    console.log('Created payment container. Payment container data: ');
    console.info(createdPaymentContainer);
}, (error) => {
    console.error(error);
});
