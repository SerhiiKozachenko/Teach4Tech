$(function(){

  var binaryClient = new BinaryClient('ws://localhost:3000');

  var $box = $('#upload-box');
  var $video = $('#video');
  var $list = $('#list');
  var $progress = $('#progress');

  $video.attr({
        controls : true,
        autoplay : true
    });

  binaryClient.on('open', function () {
    _list(_setupList);
    $box.on('dragenter', _fizzle);
    $box.on('dragover', _fizzle);
    $box.on('drop', _setupDragDrop);
  });

  binaryClient.on('stream', function (stream) {
    _download(stream, function (err, src) {
        $video.attr('src', src);
    });
  });



function _setupList(err, files) {
    var $ul, $li, $a;
 
    $list.empty();
    $ul = $('<ul>').appendTo($list);
 
    files.forEach(function (file) {
         $li = $('<li>').appendTo($ul);
            $a  = $('<a>').appendTo($li);

            $a.attr('href', '#')
              .text(file)
              .click(function (e) {
                _fizzle(e);

                var name = $(this).text();
                _request(name);
            });
    });
}

function _setupDragDrop(e) {
    _fizzle(e);
 
    var file, tx;
 
    file = e.originalEvent.dataTransfer.files[0];
    tx = 0;
 
    _upload(file, function (err, data) {
        var msg;
 
        if (data.end) {
            msg = "Upload complete: " + file.name;
 
            _list(_setupList);
        } else if (data.rx) {
            msg = Math.round(tx += data.rx * 100) + '% complete';
 
        } else {
            // assume error
            msg = data.err;
        }
 
        $progress.text(msg);
 
        if (data.end) {
            setTimeout(function () {
                $progress.fadeOut(function () {
                    $progress.text('Drop file here');
                }).fadeIn();
            }, 5000);
        }
    });
}

// video
function _list(cb) {
    var stream = _emit('video-list');
 
    stream.on('data', function (data) {
        cb(null, data.files);
    });
 
    stream.on('error', cb);
}

function _upload(file, cb) {
    var stream = _emit('video-upload', {
        name: file.name,
        size: file.size,
        type: file.type
    }, file);
 
    stream.on('data', function (data) {
        cb(null, data);
    });
 
    stream.on('error', cb);
}

function _request(name) {
    _emit('video-request', { name : name });
}

function _download(stream, cb) {
    var parts = [];
 
    stream.on('data', function (data) {
        parts.push(data);
    });
 
    stream.on('error', function (err) {
        cb(err);
    });
 
    stream.on('end', function () {
        var src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
        cb(null, src);
    });
}

// common
function _emit(event, data, file) {
    file = file || {};
    data = data || {};
    data.event = event;
 
    return binaryClient.send(file, data);
}

function _fizzle(e) {
    e.preventDefault();
    e.stopPropagation();
}

});

