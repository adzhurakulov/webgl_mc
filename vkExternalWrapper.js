const UNITY_OBJECT = "VKManager(Clone)";
const UNITY_METHOD = "VKExternalIncomingCall";

function vkInit(callback_name_in)
{
    console.log('Calling app init');
    vkBridge
        .send('VKWebAppInit')
        .then(data =>
        {
            data = JSON.stringify(data);
            var json = JSON.stringify({
                key: callback_name_in,
                payload: data
            });
            console.log(data);
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        });
}

function getUserData(callback_name_in) {
    console.log('getUserData');
    vkBridge
        .send('VKWebAppGetUserInfo')
        .then(data =>
        {
            data = JSON.stringify(data);
            var json = JSON.stringify({
                key: callback_name_in,
                payload: data
            });
            console.log(data);
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        });
}

function getEmail(callback_name_in) {
    console.log('getEmail');
    vkBridge
        .send('VKWebAppGetEmail')
        .then(data => {
            console.log(data);
            data = JSON.stringify(data);
            var json = JSON.stringify({
                key: callback_name_in,
                payload: data
            });
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        })
        .catch(error => {
            var json = JSON.stringify({
                key: callback_name_in,
                payload: error
            });
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        });
}

function checkNativeAds(callback_name_in, placement_name)
{
    console.log('checkNativeAds'.concat(' ', callback_name_in).concat(' ', placement_name));
    vkBridge
        .send('VKWebAppCheckNativeAds', {
            ad_format: "reward"
        })
        .then(data => {
            console.log(data);
            data.placementName = placement_name;
            data = JSON.stringify(data);
            var json = JSON.stringify({
                key: callback_name_in,
                payload: data
            });
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        })
        .catch(error => {
            var json = JSON.stringify({
                key: callback_name_in,
                payload: error
            });
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        });
}

function showNativeAds(callback_name_in)
{
    vkBridge.send('VKWebAppShowNativeAds', {
        ad_format: "reward"
    })
    .then(data => {
        console.log(data);
        data = JSON.stringify(data);
        var json = JSON.stringify({
            key: callback_name_in,
            payload: data
        });
        unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
    })
    .catch(error => {
        var json = JSON.stringify({
            key: callback_name_in,
            payload: error
        });
        unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
    });
}

function showOrderBox(callback_name_in, item_in) {
    console.log('showOrderBox'.concat(' ', callback_name_in).concat(' ', item_in));
    vkBridge.send('VKWebAppShowOrderBox', {
        type: "item",
        item: item_in
    })
        .then(data => {
            data = JSON.stringify(data);
            var json = JSON.stringify({
                key: callback_name_in,
                payload: data
            });
            console.log('showOrderBox data'.concat(' ', json));
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        })
        .catch(error => {
            var json = JSON.stringify({
                key: callback_name_in,
                payload: error
            });
            console.log('showOrderBox error'.concat(' ', json));
            unityClient.SendMessage(UNITY_OBJECT, UNITY_METHOD, json);
        });
}
