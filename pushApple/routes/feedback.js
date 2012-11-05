var apns = require('apn');
var options = {
    cert: __dirname+'/../public/secret/PushChatCert.pem',
    key: __dirname+'/../public/secret/PushChatKey.pem',
    passphrase: 'testpush',
    address: 'feedback.sandbox.push.apple.com',
    port: 2196,
    feedback: feedReceive,
    errorCallback: errorBack,
    interval: 30
};

var feedback = new apns.Feedback(options);

function feedReceive(time,token){
    console.log("list:",time,token);
}
function errorBack(error){
    console.log("error:",error);
}

//feedback.cancel();
//feedback.start()