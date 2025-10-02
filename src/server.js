const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const { app } = require("./index");
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
