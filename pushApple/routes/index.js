var  io = require('socket.io').listen(8888);

var pushJS=require('./apnConfig.js');
var feedJS=require('./feedConfig.js');
var mongo = require('mongodb'),
    Db = mongo.Db,
    Server = mongo.Server,
    server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = Db('ios', server);

io.sockets.on('connection', function (socket) {
    socket.on('message', function(data){
        console.log(data);
        if(data.tokens.length !=0){
            pushJS.push(data ,function (data){
                io.sockets.emit('alert',data);
            });
        }else{
            io.sockets.emit('alert',"请选择一个token！！！");
        }
    });
    socket.on('feed',function(){
        feedJS.feed(function(list,error){})
    });
    console.log("the connect is fine");
});
exports.index = function(req, res){
    var url=req.headers.host;
    var clientIP="http://"+url.substring(0,url.indexOf(':3000',0));
    db.collection('token', function(err, collection) {
        collection.find().toArray(function(err, items) {
            if(err){console.log(err)}
            res.render('index', {token: items,cilentIP:clientIP });
        });
    });
};
exports.token=function (req,res){
    console.log('req : ',req);
    var data=eval('(' + req.body.data + ')');
    console.log(data);
    db.collection('token', function(err, collection) {
        var docs={name:data.name,token:data.token.substring(1,data.token.length-1)};
        collection.insert(docs, {safe:true}, function(err, result) {
            if(err){console.log(err) ;}
            console.log("数据已插入数据库");
            io.sockets.emit('refresh',{state:200});
        });
    });
    res.send({state:200,message:"hello"});
};