var http=require("http");

var data={key:"47f7517708a26e47a3974f1bbd36621e61ae997983bbc795cb8cc1571fa7302e",
    channel:"",
    type:"ios",
    data:{alert:"Hello World!"}};
var pustData=JSON.stringify(data);

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': pustData.length
};

var options = {
    host: '192.168.1.111',
    port: 3000,
    path: '/token',
    method: 'POST'
//    headers:headers
};

var req = http.request(options, function(res) {
//    console.log('STATUS: ' + res.statusCode);
//    console.log('HEADERS: ' + JSON.stringify(res.headers));
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        var ret= eval('(' + chunk + ')');
//        console.log('response : ' , ret);
//    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
console.log('data='+JSON.stringify({name:'fred',token:'<123 345 678>'}))
// write data to request body
//{ data: '{"token":"<dba3741b 5db22da7 0f48b1fb 0584bbd7 8dea66d1 16920466 8b18aff6 49ee847b>","name":"fred"}' }
req.write('data='+JSON.stringify({name:'fred',token:'<123 345 678>'}));

req.end();