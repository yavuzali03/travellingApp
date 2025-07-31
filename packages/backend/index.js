const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const db = require('./config/database.js');

const Auth = require('./routes/auth.js');
const Trip = require('./routes/trip.js');
const Friend = require('./routes/friends.js');
const User = require('./routes/user.js');
const Search = require('./routes/searchUsers.js');
const Messages = require('./routes/messages.js');
const Upload = require('./routes/upload.js');
const placesRoute = require('./routes/places');
const GeminiApi = require('./routes/geminiService.js');

const socketIo = require('./config/socket.js');

const app = express();

db();

app.use(cors());

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(session({
    secret: 'gizliAnahtar', // .env dosyasına da koyabilirsin
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 📦 GÖRSEL SERVİSİ
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', Auth);
app.use('/api', Trip);
app.use('/api', Friend);
app.use('/api', User);
app.use('/api', Search);
app.use('/api', Messages);
app.use('/api', Upload);
app.use('/api/places', placesRoute);
app.use('/api', GeminiApi);

app.get('/api', (req, res) => {
    res.json({ message: 'api isteği' });
});

const server = socketIo(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
