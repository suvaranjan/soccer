const express = require('express');
const path = require('path');
const cors = require('cors');
const connect = require("../server/db/db");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");
const managerRoutes = require("./routes/managerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const fieldsRoutes = require("./routes/fieldsRoutes");
const refereeRoutes = require("./routes/refereeRoutes");
const matchRoutes = require("./routes/matchRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const postRoutes = require("./routes/postRoutes");
const reminderScheduler = require('./reminder/myReminder');
const upload = require('./helper/uploadHelper');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the soccer app');
});

app.post('/upload', (req, res) => {
    console.log(req.file);

    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected!' });
            } else {
                res.status(200).json({
                    message: 'File uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/fields", fieldsRoutes);
app.use("/api/referee", refereeRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/posts", postRoutes);

// Deployment logic

// const dirname1 = path.resolve();
// app.use(express.static(path.join(dirname1, '../client/dist')));

// app.use('*', (req, res) => {
//     res.sendFile(path.resolve(dirname1, "client", "dist", "index.html"));
// });


connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        });

        // Start the reminder scheduler
        reminderScheduler.scheduleRecurringReminders();
    } catch (error) {
        console.log(error);
    }
});