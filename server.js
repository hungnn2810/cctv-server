const express = require("express");
const app = express();
const { proxy, scriptUrl } = require("rtsp-relay")(app);
const handler = proxy({
  url: `rtsp://admin:Kztek123456@192.168.21.195:554/stream`,
  verbose: false,
  additionalFlags: [
    "-vf",
    "scale=1280:720", // Scale the video to 720p
    "-qscale:v",
    "6", // Adjust quality, where lower value means higher quality
  ],
});

app.ws("/api/stream", handler);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});

app.ws("/api/stream", handler);
