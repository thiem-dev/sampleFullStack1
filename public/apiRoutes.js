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

app.get('/api/game', async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * FROM game;`
        )
        res.send(result.rows)
    } catch(error){
        console.log(error)
        res.json(error)
    }
});

app.get('/api/game/:gName', async (req, res) => {
    const {gName} = req.params;
    try{
        const result = await pool.query(
            `SELECT * FROM game
            WHERE name=$1;`, [gName]
        )
        
        if(result.rows.length === 0){
            return res.status(404).send(`Game Name: ${gName} does not exist`);
        }

        res.send(result.rows)
    } catch(error){
        console.log(error)
        res.json(error)
    }
});



app.listen(apiPort, () => {
    console.log(`server listening on http://localhost:${apiPort}`)
})