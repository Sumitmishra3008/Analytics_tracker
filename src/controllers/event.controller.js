const { Event } = require("../models/event.model");
const { validationResult } = require("express-validator");

module.exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  await Event.create({
    user_id: req.body.user_id,
    event_name: req.body.event_name,
    event_data: req.body.event_data,
    timestamp: req.body.timestamp,
  });
  res.status(200).json({ message: "Event created successfully" });
};

module.exports.getEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(200).json({ events: events });
};
