const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // 💡 EKLENDİ
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');
const Trip = require('./routes/trip.js');
const Friend = require('./routes/friends.js');
const User = require('./routes/user.js');
const Search = require('./routes/searchUsers.js');
const Messages = require('./routes/messages.js');
const Upload = require('./routes/upload.js');

const socketIo = require('./config/socket.js');

const app = express();
dotenv.config();
db();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// 📦 GÖRSEL SERVİSİ
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', Auth);
app.use('/api', Trip);
app.use('/api', Friend);
app.use('/api', User);
app.use('/api', Search);
app.use('/api', Messages);
app.use('/api', Upload);

app.get('/api', (req, res) => {
    res.json({ message: 'api isteği' });
});

const server = socketIo(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
