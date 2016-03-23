//  package
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('MD5');
var cors = require('cors');

var config = require('./config');
var _ = require('lodash');

var app = express();
var routes = require('./routes');
//var authUser = require('./common/auth.js');
var crypto = require('crypto');
var multer = require('multer');

var compress = require('compression');

app.use(compress());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs-mate'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.session_secret,
    store: new MongoStore({
        url: config.db
    }),
    // cookie: { maxAge: 60000,secure: true },
//    cookie: {
//        maxAge: 1000 * 60 * 15,
//        domain: '*'
//    },
    resave: true,
    saveUninitialized: true,
}));

var corsOptions = {
    credentials:true,
    preflightContinue:true
};

app.use(cors(corsOptions));
//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", req.headers.origin);
//    res.header("Access-Control-Allow-Credentials", true);
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization,X-Prototype-Version,Allow,*, Content-Length");
//    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//    next();
//});

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(authUser.authUser);

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    //res.locals.current_user
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
var User = require('./models').User;
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        badRequestMessage: 'ERR_MISSING_CREDENTIALS'
    },
    function(email, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            User.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    return done(null, false, 'ERR_INVALID_USER');
                }
                if (user.password != md5(password)) {
                    return done(null, false, 'ERR_INVALID_PASSWORD');
                }
                
                // var auth_token = encrypt(user._id + '\t' + user.pass + '\t' + user.email, config.session_secret);

                // res.cookie(config.auth_cookie_name, auth_token, {
                //     path: '/',
                //     maxAge: 1000 * 60 * 60 * 24
                // }); //cookie 有效期1天
                
                return done(null, user);
            })
        });
    }
));

// set route
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// set static, dynamic helpers
_.extend(app.locals, {
    config: config
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
