const router = require('express').Router();
const hotelConroller = require('../controllers/hotel.controller');
const upload = require("../middleware/multer")

router.get('/:hotel', hotelConroller.getOneHotel);

router.get('/', hotelConroller.getHotels);

router.get('/:name', hotelConroller.getHotelbyname);

router.get('/city/:city', hotelConroller.getHotelbycity);

router.get('/stars/:stars', hotelConroller.getHotelbystars);

router.post('/add', upload.array("images"), hotelConroller.createHotel);
// hotelConroller.uploadImage,

router.delete('/delete/:hotel', hotelConroller.deletHotel);

router.delete('/delete', hotelConroller.deletallHotels);

router.patch('/update/:hotel', hotelConroller.updateHotel);

module.exports = router;