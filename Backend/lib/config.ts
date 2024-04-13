import * as dotenv from 'dotenv';
require('dotenv').config()

export const config = {
    api_port: process.env.API_PORT,
    databaseUrl: process.env.DB_ADDRESS

};
