import express from 'express';
import pg from 'pg'

const { Pool } = pg;
const apiPort = 3000;
const app = express();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "gameshop",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

app.use(express.json());
app.use(express.static('public'))

app.get('/api/game')