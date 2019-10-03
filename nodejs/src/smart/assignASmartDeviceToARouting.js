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

smartRoutingsApi.assignDeviceToRouting("SRT_...", "SDV_...").then((smartRouting) => {
    console.info(smartRouting);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId)
});

smartRoutingsApi.assignDeviceToRouting("SRT_...", "SDV_...").then((smartRouting) => {
    console.info(smartRouting);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
