 import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    portAdmin: process.env.PORT_ADMIN || 3001,
    mongo_uri: process.env.MONGO_URI,
};

