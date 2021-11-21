const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price } = req.body;
    const { user_id } = req.headers;
    const { filename } = req.file;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const event = await Event.create({
      title,
      description,
      price: parseFloat(price),
      user: user_id,
      thumbnail: filename,
    });

    return res.json(event);
  },

  async getAllEvents(req, res) {
    try {
      const events = await Event.find({});

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "No events at the moment!" });
    }
  },
  // async getAllEvents(req, res) {
  //   const {eventType} = req.params;
  //   try {

  //     if (!sport) {

  //       return res.json(events);
  //     }
  //   } catch (error) {
  //     return res.status(400).json({ message: "No events at the moment!" });
  //   }
  // },

};
