var passport = require('passport');

export.login = function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.jsonp({
                result: false,
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            return res.json({
                id: user.id,
                result: true
            });

        });
    })(req, res, next);
}