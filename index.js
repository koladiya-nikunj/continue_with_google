const express = require('express');
const passport = require('passport');
const session = require('express-session')
const app = express()
require('./auth')
const buttonHtml = require('./button');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}
app.use(session({ secret: 'cats',resave:false,saveUninitialized:false }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send(buttonHtml);
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/auth/failure'
    })
)
app.get('/auth/failure', (res, req) => {
    res.send('Something went wrong..')
})

app.get('/success', (req, res) => {
    if (!req.user) {
        res.send('Please login first');
    } else {
        const helloMessage = `Hello ${req.user.displayName}, you are successfully logged in with ${req.user.emails[0].value}`;
        const logoutButton = '<button onclick="logout()">Logout</button>';
        const htmlResponse = `${helloMessage}<br>${logoutButton}<script>function logout() { window.location.href = "/logout"; }</script>`;

        res.send(htmlResponse);
    }
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);
            } else {
                res.redirect('/');
            }
        });
    });
});


app.listen(5000, () => console.log('app is running on 5000'))