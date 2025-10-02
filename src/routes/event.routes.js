const express = require("express");
const router = express.Router();
const cors = require("cors");
const eventcontroller = require("../controllers/event.controller");
const { query, body } = require("express-validator");

router.use(express.json());
router.use(cors());

router.post(
  "/createevent",
  [
    body("user_id").isString().notEmpty(),
    body("event_name").isString().notEmpty(),
    body("event_data").isObject().optional(),
    // body("timestamp").isISO8601(),
  ],
  eventcontroller.createEvent
);
router.get(
  "/getevents",
  [
    query("start")
      .optional()
      .isISO8601()
      .withMessage("start must be a valid date"),
    query("end").optional().isISO8601().withMessage("end must be a valid date"),
    query("event_name").optional().isString(),
  ],
  eventcontroller.getEvents
);

module.exports = router;
