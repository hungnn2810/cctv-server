import express from 'express';
import expressWs from 'express-ws';
import rtspRelay from 'rtsp-relay';
import DeviceAttribute from './models/deviceAttribute.js'; // Must include .js

const app = express();
const wsInstance = expressWs(app); // Enables WebSocket support
const { proxy, scriptUrl } = rtspRelay(app);

app.ws('/api/stream/:ip', async (ws, req) => {
  const ip = req.params.ip;
  try {
    const deviceAttribute = await DeviceAttribute.findOne({
      where: {
        code: 'ipAddress',
        value: ip,
      },
    });

    if (!deviceAttribute) {
      ws.close(1011, 'Device not found');
      return;
    }

    const rtsp = await DeviceAttribute.findOne({
      where: {
        code: 'rtspPort',
      },
      attributes: ['value'],
    });

    const username = await DeviceAttribute.findOne({
      where: {
        code: 'username',
      },
      attributes: ['value'],
    });

    const password = await DeviceAttribute.findOne({
      where: {
        code: 'password',
      },
      attributes: ['value'],
    });

    const handler = proxy({
      url: `rtsp://${username.value}:${password.value}@${ip}:${rtsp.value}/stream`,
      verbose: false,
      additionalFlags: ['-vf', 'scale=1280:720', '-qscale:v', '6'],
    });

    return handler(ws, req);
  } catch (error) {
    console.error('WebSocket error:', error);
    ws.close(1011, 'Internal server error');
  }
});

export default app;
