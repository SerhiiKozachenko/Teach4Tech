var fs = require('fs');


var UPLOAD_PATH = __dirname + '/../content';
var SUPPORTED_TYPES = [
    'video/mp4',
    'video/webm',
    'video/ogg'
];

function _getList(stream, meta){
  fs.readdir(UPLOAD_PATH, function (err, files) {
    stream.write({ files : files });
  });
};

function _getVideo(client, meta){
  var file = fs.createReadStream(UPLOAD_PATH + '/' + meta.name);
  client.send(file);
};

function _save(stream, meta){
  if (!~SUPPORTED_TYPES.indexOf(meta.type)) {
    stream.write({ err: 'Unsupported type: ' + meta.type });
    stream.end();
    return;
  }
 
  var file = fs.createWriteStream(UPLOAD_PATH + '/' + meta.name);
  stream.pipe(file);
 
  stream.on('data', function (data) {
    stream.write({ rx: data.length / meta.size });
  });
 
  stream.on('end', function () {
    stream.write({ end: true });
  });
};

module.exports = {
    getList : _getList,
    getVideo : _getVideo,
    save : _save
};