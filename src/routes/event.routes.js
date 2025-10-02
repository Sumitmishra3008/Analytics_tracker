const express = require("express");
const router = express.Router();
const cors = require("cors");
const eventcontroller = require("../controllers/event.controller");
const { body } = require("express-validator");

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
router.get("/getevents", eventcontroller.getEvents);

module.exports = router;
