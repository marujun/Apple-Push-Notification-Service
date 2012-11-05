
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
var errors=0;
var apnsConnection = new apns.Connection(options);

var note = new apns.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.

console.log("Notification的字节数",note.length());

function handleError(errorCode, notification){
    console.log("error: ",errorCode);

    errors=errorCode;
}
var errorData;
function push(data,callback){
    note.payload = {'color': data.colour};
    note.alert=data.message;
    note.badge=Number(data.badge);
    note.sound = data.sound;
    note.setActionLocKey(data.ActionLocKey);
    data.tokens.forEach(function (token){
        apnsConnection.sendNotification(note.clone(new apns.Device(token)));
    });
    setTimeout(function(){
        if(errors!=0){
            switch (errors){
                case 8:errorData ="无效的token值!";break;
                case 4:errorData ="无效的token值!";break;
                case 7:errorData ="push的长度本可以超过255个字节，请重新输入";break;
            }
            callback(errorData);
        }else{callback("发送成功！");}
    },1000);


}
exports.push=push;