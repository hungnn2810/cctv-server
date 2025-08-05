// models/deviceAttribute.js
import { STRING } from 'sequelize';
import sequelize from '../config/database.js';

const DeviceAttribute = sequelize.define(
  'device_attributes',
  {
    code: {
      type: STRING,
    },
    value: {
      type: STRING,
    },
  },
  {
    timestamps: false, // Optional: disable createdAt/updatedAt
  },
);

export default DeviceAttribute;
