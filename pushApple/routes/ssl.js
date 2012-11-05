var tls = require('tls');
var fs = require('fs');

var data={key:"47f7517708a26e47a3974f1bbd36621e61ae997983bbc795cb8cc1571fa7302e",
    channel:"",
    type:"ios",
    data:{alert:"Hello World!"}};
var pustData=JSON.stringify(data);

var options = {
    // These are necessary only if using the client certificate authentication
    key: fs.readFileSync(__dirname+'/../public/secret/PushChatKey.pem'),
    cert: fs.readFileSync(__dirname+'/../public/secret/PushChatCert.pem'),

    // This is necessary only if the server uses the self-signed certificate
    ca: [ fs.readFileSync(__dirname+'/../public/secret/ck.pem') ],
    //private key's passphrase
    passphrase:"testpush"
};
var cleartextStream = tls.connect(2195,"gateway.sandbox.push.apple.com", options, function() {
    console.log('client connected',cleartextStream.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(cleartextStream);
    process.stdin.resume();
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
    console.log(data);
});
cleartextStream.on('end', function() {
    server.close();
});