const express = require('express');
const router = express.Router();
const { allReserv, create, deleteReservation } = require('../controllers/reserve.controller')
// const { authenticated } = require('../middleware/reservation.middlexare');
const {VerifyJwt} = require('../middleware/auth.middlewares')

router.get('/', allReserv);
router.post('/create/:id',VerifyJwt, create);
router.delete('/delete/:id', deleteReservation);


module.exports = router;