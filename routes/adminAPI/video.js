var router = require('express').Router();
var Video = require('../../models/video');

router.get('/search', _isAdminLoggedIn, function(req, res, next){
  Video.find({}, function(err, data){
    if (err) {
      next(err);
    } else {
      res.json({data: data, total: data.length});
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