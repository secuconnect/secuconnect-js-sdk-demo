let SecuconnectJsSdk = require('./../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let fileCache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(fileCache);

let smartRoutingsApi = new SecuconnectJsSdk.SmartRoutingsApi();
smartRoutingsApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let smartRoutingsDTO = new SecuconnectJsSdk.SmartRoutingsDTO();
smartRoutingsDTO.store = 'STO_...';
smartRoutingsDTO.description = 'TestRouting';

smartRoutingsApi.addRouting(smartRoutingsDTO).then((smartRouting) => {
    console.info(smartRouting);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
