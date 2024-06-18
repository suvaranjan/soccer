const express = require('express');
const cors = require('cors');
const connect = require("../server/db/db");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");
const managerRoutes = require("./routes/managerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the soccer app');
});

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/notifications", notificationRoutes);


connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
});