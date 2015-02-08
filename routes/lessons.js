var router = require('express').Router();
var Video = require('../models/video');
var path = require("path");
var fs = require("fs");

var UPLOAD_PATH = __dirname + '/../upload/video';

router.get('/', _isUserLoggedIn, function(req, res, next){
  Video.find({}, function(err, data){
    if (err) {
      next(err);
    } else {
      res.render('lessons/index', {lessons: data});
    }
  });
});

router.get('/playback/:videoId', _isUserLoggedIn, function(req, res, next){
  var videoId = req.params.videoId;
  Video.findOne({_id: videoId}, function(err, data){
    if (err) {
      next(err);
    } else {
      if (!data) {
        res.end();
        return;
      }
      var fileName = data.file;
      if (!data || !fileName) {
        res.end();
        return;
      }
      console.log('filename: '+fileName);

      var filePath = path.resolve(UPLOAD_PATH, fileName);
      var range = req.headers.range;
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);

      fs.stat(filePath, function(err, stats) {
        if (err) {
          console.log(err);
          next(err);
          return;
        }

        var total = stats.size;
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunksize = (end - start) + 1;

        console.log('start: '+start);
        console.log('end: '+end);
        console.log('chunk: '+chunksize);

        res.writeHead(206, {
          "Content-Range": "bytes " + start + "-" + end + "/" + total,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4"
        });

        var stream = fs.createReadStream(filePath, { start: start, end: end })
          .on("open", function() {
            stream.pipe(res);
          })
          .on("error", function(err) {
            res.end(err);
          });
      });

    }
  });
});


function _isUserLoggedIn(req, res, next){
  if (req.user /*&& req.user.role == 'su'*/){
    next();
  } else {
    res.redirect('/auth/login');
  }
};

module.exports = router;
