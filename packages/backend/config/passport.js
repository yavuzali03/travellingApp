const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5002/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // E-posta ile kullanıcıyı kontrol et
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = await User.create({
                googleId: profile.id,
                username: profile.displayName.replace(/\s/g, '').toLowerCase(),
                firstName: profile.displayName.split(' ')[0],
                lastName: profile.displayName.split(' ')[1] || '',
                email: profile.emails[0].value,
                password: null,
                profileImage: profile.photos?.[0]?.value || null,
                authType: 'google'
            });
        }

        done(null, user);

    } catch (err) {
        done(err, null);
    }
}));

module.exports = passport;
