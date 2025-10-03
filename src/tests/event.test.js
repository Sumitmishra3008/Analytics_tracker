// tests/events.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { app } = require("../index"); // Import your Express app
const { Event } = require("../models/event.model");

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Event.deleteMany(); // clean database after each test
});

describe("POST /api/events/createevent", () => {
  it("should create event with valid payload", async () => {
    const res = await request(app)
      .post("/api/events/createevent")
      .send({
        user_id: "u123",
        event_name: "page_view",
        event_data: { page: "/home" },
        timestamp: new Date().toISOString(),
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Event created successfully");

    const saved = await Event.findOne({ event_name: "page_view" });
    expect(saved).not.toBeNull();
    expect(saved.user_id).toBe("u123");
  });

  it("should fail if user_id is missing", async () => {
    const res = await request(app).post("/api/events/createevent").send({
      event_name: "page_view",
      timestamp: new Date().toISOString(),
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail if timestamp is invalid", async () => {
    const res = await request(app).post("/api/events/createevent").send({
      user_id: "u123",
      event_name: "page_view",
      timestamp: "not-a-date",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("errors");
  });
});

describe("GET /api/events/getevents", () => {
  it("should return aggregated counts", async () => {
    const now = new Date();

    await Event.create([
      { user_id: "u1", event_name: "page_view", timestamp: now },
      { user_id: "u2", event_name: "page_view", timestamp: now },
      { user_id: "u3", event_name: "purchase", timestamp: now },
    ]);

    const res = await request(app).get("/api/events/getevents");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("events");
    expect(res.body.events.page_view).toBe(2);
    expect(res.body.events.purchase).toBe(1);
  });

  it("should filter by date range", async () => {
    const oldDate = new Date("2023-01-01T00:00:00Z");
    const newDate = new Date("2024-01-15T00:00:00Z");

    await Event.create([
      { user_id: "u1", event_name: "page_view", timestamp: oldDate },
      { user_id: "u2", event_name: "page_view", timestamp: newDate },
    ]);

    const res = await request(app)
      .get("/api/events/getevents")
      .query({ start: "2024-01-01", end: "2024-02-01" });

    expect(res.statusCode).toBe(200);
    expect(res.body.events.page_view).toBe(1); // only newDate event counts
  });

  it("should filter by event_name", async () => {
    const now = new Date();

    await Event.create([
      { user_id: "u1", event_name: "page_view", timestamp: now },
      { user_id: "u2", event_name: "purchase", timestamp: now },
    ]);

    const res = await request(app)
      .get("/api/events/getevents")
      .query({ event_name: "purchase" });

    expect(res.statusCode).toBe(200);
    expect(res.body.events).toHaveProperty("purchase");
    expect(res.body.events).not.toHaveProperty("page_view");
  });

  it("should return empty if no events exist", async () => {
    const res = await request(app).get("/api/events/getevents");
    expect(res.statusCode).toBe(200);
    expect(res.body.events).toEqual({});
  });
});
