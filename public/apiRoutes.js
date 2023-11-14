import express from 'express';
import pg from 'pg';
import cors from 'cors';

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

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

// GET ROUTES
app.get('/api/game', async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * FROM game;`
        )
        res.status(201).send(result.rows)
    } catch(error){
        console.log(error)
        res.status(400).json(error)
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
            return res.status(400).send(`Game Name: ${gName} does not exist`);
        }

        res.send(result.rows)
    } catch(error){
        console.log(error)
        res.json(error)
    }
});

app.post('/api/game', async (req, res) => {
    const { gameName, developer, gameShopId } = req.body
    try{
        const result = await pool.query(
            `INSERT INTO game (name, developer, gameShop_id) VALUES
            ($1, $2, $3) 
            RETURNING *`, [gameName, developer, gameShopId]
        );

        if(result.rows.length === 0){
            return res.status(400).send(`Could not insert ${req.body}`)
        }
        res.status(201).send(result.rows)
    } catch(error){
        console.log(error)
        res.json(error)
    }
})

// CATCH ALL MIDDLEWARE
app.use('/', (req, res, next) => {
    next({message: "The path you are looking for does not exist", status: 404})
})

app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err })
})



app.listen(apiPort, () => {
    console.log(`server listening on http://localhost:${apiPort}`)
})