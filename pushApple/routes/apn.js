var apns = require('apn');

var options = {
    cert: __dirname+'/../public/secret/PushChatCert.pem',
    key: __dirname+'/../public/secret/PushChatKey.pem',
    passphrase: 'testpush',
    gateway: 'gateway.sandbox.push.apple.com',
    port: 2195,
    enhanced: true,
    errorCallback: handleError,
    cacheLength: 100
};

var apnsConnection = new apns.Connection(options);

var tokenOne = '47f75177 08a26e47 a3974f1b bd36621e 61ae9979 83bbc795 cb8cc157 1fa7302e';
var tokenTwo = 'dba3741b 5db22da7 0f48b1fb 0584bbd7 8dea66d1 16920466 8b18aff6 49ee847b';
var myDevice = new apns.Device(tokenOne);

var note = new apns.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
//note.sound = "startSound.wav";
note.badge =  5 ;
note.alert = {'body':'open ','action-loc-key':'打开','launch-image':'test.png'};
//note.alert ={ "loc-key" : "GAME_PLAY_REQUEST_FORMAT", "loc-args" : [ "Jenna", "Frank"] };
note.payload = {'color':'green'};
note.device = myDevice;

console.log("Notification的字节数",note.length());


apnsConnection.sendNotification(note);


apnsConnection.sendNotification(note.clone(new apns.Device(tokenTwo)));

function handleError(errorCode, notification){
    console.log("error: ",errorCode)
}
