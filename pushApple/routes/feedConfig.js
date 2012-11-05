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
var list=[],error;
var feedback = new apns.Feedback(options);

function feedReceive(time,token){
    console.log("list:",time,token);
    list.push({time:time,token:token})
}
function errorBack(err){
    console.log("error:",error);
    error=err;
}

feedback.cancel();

exports.feed=feed;
function feed(callback){
    feedback.start();
    feedback.cancel();
    callback(error,list);
}