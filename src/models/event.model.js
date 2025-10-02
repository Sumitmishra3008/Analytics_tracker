const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const eventSchema = new mongoose.Schema({
  event_id: { type: String, default: uuidv4, unique: true },
  user_id: { type: String, required: true },
  event_name: { type: String, required: true },
  event_data: { type: mongoose.Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
