const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Hotel must have a name']
    },
    description: {
        type: String,
        required: [true, 'Hotel must have a description']
    },
    localisation: {
        city: {
            type: String,
            required: [true, 'Hotel must have a city']
        },
        country: {
            type: String,
            required: [true, 'Hotel must have a coutry']
        }
    },
    price: {
        type: String,
        required: [true, 'Hotel must have a price']
    },
    stars: {
        type: String,
        required: [true, 'Hotel must have a stars']
    },
    images: [{
        type: String,
        required: [true, 'Hotel must have at least 4 images']
    }],
    roomId: {
        type: mongoose.Types.ObjectId,
        ref: 'Room'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
});

const HotelModel = mongoose.model('Hotel', hotelSchema);

module.exports = HotelModel;