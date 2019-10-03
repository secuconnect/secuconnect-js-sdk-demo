let SecuconnectJsSdk = require('./../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let fileCache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(fileCache);

let smartDevicesApi = new SecuconnectJsSdk.SmartDevicesApi();
smartDevicesApi.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

smartDevicesApi.getAll(null, null, null, "vendor:ingenico AND !(_exists_:routing) AND merchant.id:MRC_...").then((smartDevices) => {
    console.info(smartDevices);
}, error => {
    console.info(error.response.body);
    console.error('Request was not successful, check the log for details. Support-ID: ' + error.response.body.supportId);
});
