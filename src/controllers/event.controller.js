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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { start, end, event_name } = req.query;

  // Parse dates or set defaults
  const startDate = start ? new Date(start) : new Date(0); // epoch if not provided
  const endDate = end ? new Date(end) : new Date(); // now if not provided

  // Match stage
  const match = { timestamp: { $gte: startDate, $lte: endDate } };
  if (event_name) match.event_name = event_name;

  // Aggregation
  const results = await Event.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$event_name",
        count: { $sum: 1 },
      },
    },
  ]);

  // Format result
  const events = {};
  results.forEach((r) => {
    events[r._id] = r.count;
  });

  res.json({
    start: startDate.toISOString().slice(0, 10),
    end: endDate.toISOString().slice(0, 10),
    events,
  });
};
