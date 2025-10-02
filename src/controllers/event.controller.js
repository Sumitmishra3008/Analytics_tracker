const { Event } = require("../models/event.model");
const { EventSchema } = require("../validators/type");

module.exports.createEvent = async (req, res) => {
  //   const reqpayload = EventSchema.safeParse(req.body);
  //   if (!reqpayload.success) {
  //     res.status(400).json({
  //       message: "Invalid request payload",
  //       errors: reqpayload.error.errors,
  //     });
  //     return;
  //   }

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
