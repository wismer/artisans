var connect = require('connect');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .listen(process.env.PORT || 3000);

app.get('/users', checkAuth, function (req, res) {
  res.send('if you view whatever')
}):

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('Not Authorized!');
  } else {
    next();
  }
}