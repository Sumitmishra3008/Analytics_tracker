// Jest setup file for handling global test configuration
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  process.env.NODE_ENV = "test";
});

afterAll(async () => {
  // Clean up
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Set test timeout
jest.setTimeout(30000);
