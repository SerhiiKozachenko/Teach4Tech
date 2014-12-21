var fs = require('fs');
var crypto = require('crypto');



var UPLOAD_PATH = __dirname + '/../upload/video';
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
 
  var md5sum = crypto.createHash('md5');
  var fileName = meta.name + '_' + md5sum.digest('hex');
  var file = fs.createWriteStream(UPLOAD_PATH + '/' + fileName);
  stream.pipe(file);
 
  stream.on('data', function (data) {
    stream.write({ rx: data.length / meta.size });
  });
 
  stream.on('end', function () {
    stream.write({ end: true, fileName: fileName });
  });
};

module.exports = {
    getList : _getList,
    getVideo : _getVideo,
    save : _save
};