const Reserv = require('../models/reservationModel')



const allReserv = async (req, res) => {
    const reservs = await Reserv.find({}).catch(e => console.log(e));
    return res.status(200).send(reservs);

}

const create = async (req, res) => {
    // return res.send(req.body)
    const reserv = new Reserv({
        fromeDate: new Date(req.body.fromeDate),
        toDate: new Date(req.body.toDate),
        payment: req.body.payment,
        chambre: req.params.id,
        owner: req.user.id
    });
    const checkInDate = parseInt(reserv.fromeDate.getTime() / 1000, 10);
    const checkOutDate = parseInt(reserv.toDate.getTime() / 1000, 10);
    if (checkInDate > checkOutDate) {
        res.status(400).send({
            status: "reserve error",
        })
    }

    const reservId = await Reserv.findOne({ chambre: req.params.id });

    if (reservId) {
        checkIn = parseInt(reservId.fromeDate.getTime() / 1000, 10)
        checkOut = parseInt(reservId.toDate.getTime() / 1000, 10)
    }
    if (!reservId || (reservId && checkInDate > checkIn && checkOutDate > checkIn) || (reservId && checkInDate < checkOut && checkOutDate < checkOut)) {

        try {
            const savedReserv = await reserv.save();
            return res.status(200).send({ reserv: savedReserv })
        } catch (e) {
            res.status(400).send({
                status: "Failed",
                msg: e
            })
        }

    }
    res.status(400).send({
        status: "already reserved ",

    })
    return
}


const deleteReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await Reserv.deleteOne({ _id: id });
        if (!reservation) return res.status(200).send("reservation not deleted");
        return res.status(200).send("reservation deleted");
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = {
    create,
    allReserv,
    deleteReservation

}
