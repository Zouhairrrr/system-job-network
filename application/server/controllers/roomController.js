const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    const roomCheck = await Room.findOne({ number: req.body.number });
    console.log(roomCheck);
    if (roomCheck)
      return res
        .status(400)
        .json({ error: true, message: "room already exists" });
    const images = req.files.map((file) => {
      return file.path;
    });
    req.body.images = images;
    const room = new Room(req.body);
    await room.save((err, data) => {
      if (err)
        return res.status(400).json({ error: true, message: err.message });
      return res.status(200).json({
        error: false,
        message: "room created successfully",
        Room: data,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findById(id);
    if (!room)
      return res
        .status(400)
        .json({ error: true, message: "Something went wrong." });
    const images = req.files.map((file) => {
      return file.path;
    });
    room.number = req.body.number;
    room.type = req.body.type;
    room.numberOfPerson = req.body.numberOfPerson;
    room.price = req.body.price;
    room.images = images;
    room.isReserved = req.body.isReserved;
    room.hotelId = req.body.hotelId;
    room.save((err, data) => {
      if (err)
        return res.status(400).json({ error: true, message: err.message });
      return res
        .status(200)
        .json({
          error: false,
          message: "room updated successfully",
          Room: data,
        });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const id = req.params.id;
    await Room.deleteOne({ _id: id })
      .then(() =>
        res.status(200).json({ error: false, message: "Room has been deleted" })
      )
      .catch((error) => {
        console.log(error.message);
        res.status(400).json({ error: true, message: error.message });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    await Room.find()
      .then((result) => res.status(200).json({ error: false, Rooms: result }))
      .catch((error) => {
        console.log(error.message);
        res.status(400).json({ error: true, message: error.message });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getOneRoom = async (req, res) => {
  try {
    const id = req.params.id;
    await Room.findById(id)
      .then((result) => res.status(200).json({ error: false, date: result }))
      .catch((error) => {
        console.log(error.message);
        res.status(400).json({ error: true, message: error.message });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getOneRoom,
};
