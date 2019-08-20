let SecuconnectJsSdk = require('./../../node_modules/secuconnect-js-sdk/dist/es2015/src/index.js');

let authenticator = new SecuconnectJsSdk.Authenticator(
    SecuconnectJsSdk.OAuthClientCredentials.from(
        '...',
        '...'
    ));

let file_cache = new SecuconnectJsSdk.FileCache();
authenticator.getApiClient().setCachePool(file_cache);

let api_instance = new SecuconnectJsSdk.SmartDevicesApi();
api_instance.apiClient.authentications.oauth_token.accessToken = authenticator.getToken();

let smartDeviceDTO = new SecuconnectJsSdk.SmartDevicesDTO();
smartDeviceDTO.merchant = "MRC_...";
smartDeviceDTO.store = "STO_...";
smartDeviceDTO.contract = "GCR_..";
smartDeviceDTO.type = "cashier";
smartDeviceDTO.vendor = "...";
smartDeviceDTO.vendor_uid = "/uuid/...";
smartDeviceDTO.description = "MerchantName";

api_instance.addDevice(smartDeviceDTO).then((createdSmartDevice) => {
    console.log('Created smart device. Smart device data: ');
    console.info(createdSmartDevice);
}, (error) => {
    console.error(error);
});
