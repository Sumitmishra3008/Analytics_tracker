const z = require("zod");

const EventSchema = z.object({
  event_id: z.string().uuid().optional(), // optional, Mongo will assign _id
  user_id: z.string().min(1, "user_id is required"),
  event_name: z.string().min(1, "event_name is required"),
  event_data: z.record(z.any()).optional(),
  timestamp: z.string().datetime(),
});

module.exports = { EventSchema };
