const http = require("http");

const options = {
  host: "localhost",
  port: process.env.PORT || 5000,
  timeout: 2000,
  path: "/",
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on("error", () => {
  process.exit(1);
});

request.end();
