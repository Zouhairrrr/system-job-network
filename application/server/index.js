const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const authRoute = require('./router/auth.routes')
const userRoute = require('./router/user.routes')
const roomsRoute = require('./router/room.routes')
const hotelRoute = require('./router/hotel.routes');
const reservationRoute = require('./router/reservation.routes')

const dbConfig = require('./config/config')
const PORT = process.env.PORT || 8080;
const app = express();
const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['secret1234'],
    //* Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const corsOptions = {
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



// * Users route
app.use('/auth', authRoute);
app.use('/user', userRoute);


app.use('/room', roomsRoute);
app.use('/reservation', reservationRoute);

app.use('/hotel', hotelRoute);

//! conncection to database : 

mongoose
    .connect(dbConfig.database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});







