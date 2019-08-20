let SecuconnectJsSdk = require('./../../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectJsSdk.PaymentCustomersApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

// Set a email filter (schema: {fieldname}:{value} )
let query = 'contact.email:' + encodeURIComponent('example@example.com'); // values MUST be url encoded
// Add a name filter
query += ' AND contact.surname:' + encodeURIComponent('DOE'); // The search is case-insensitive
query += ' AND contact.forename:' + encodeURIComponent('John');

api_instance.paymentCustomersGet(
    1,
    null,
    null,
    query
).then(response => {
    console.info(response);

    if (response.count > 1) {
        console.log('WARNING: there was more than one customer found.');
    }
}, (error) => {
    console.error(error);
});
