var router = require('express').Router();
var Video = require('../../models/video');
var async = require('async');

router.get('/search', _isAdminLoggedIn, function(req, res, next){

  var take = req.query.take || 10;
  var skip = req.query.skip || 0;
  var page = req.query.page || 1;
  var pageSize = req.query.pageSize || 10;
  var sort = req.query.sort || [];
  var query = Video.find();
  query = query.skip(skip).limit(take);
  for(var i = 0; i < sort.length; i++) {
    var param = {};
    param[sort[i].field] = sort[i].dir == 'asc' ? 1 : -1;
    query = query.sort(param);
  }

  var result, totalCount;
  async.parallel([
    function(callback) {
      query.find({}, function(err, data){
        if (err) {
          callback(err);
        } else {
          result = data;
          callback();
        }
      });
    },
    function(callback) {
      Video.count(function(err, count){
        if (err) {
          callback(err);
        } else {
          totalCount = count;
          callback();
        }
      })
    }
  ], function(err) {
    if (err) {
      next(err);
    } else {
      res.json({data: result, total: totalCount});
    }
  });

});

function _isAdminLoggedIn(req, res, next){
  if (req.user /*&& req.user.role == 'su'*/){
    next();
  } else {
    res.redirect('/auth/login');
  }
};

module.exports = router;