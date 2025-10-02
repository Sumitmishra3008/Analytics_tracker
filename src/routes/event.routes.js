const express = require("express");
const router = express.Router();
const cors = require("cors");
const eventcontroller = require("../controllers/event.controller");

router.use(express.json());
router.use(cors());

router.post("/createevent", eventcontroller.createEvent);
router.get("/getevents", eventcontroller.getEvents);

module.exports = router;
