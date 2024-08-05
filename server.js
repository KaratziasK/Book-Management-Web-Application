const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const database = new sqlite3.Database('./books.sqlite');
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

database.serialize(() => { // Δημιουργία του πίνακα αν δεν υπάρχει
    database.run(`CREATE TABLE IF NOT EXISTS books ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author VARCHAR(25) NOT NULL,
        title VARCHAR(40) NOT NULL,
        genre VARCHAR(20) NOT NULL,
        price REAL NOT NULL
    )`);
});

function query(q, parameters = []){//Εκτελεση ερωτηματων  
    return new Promise((resolve, reject) => {
        database.all(q, parameters,(err, rows) =>{
            if(err){
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

app.post('/books',async (req, res)=>{    // post για το add
    const { author, title, genre, price }=req.body; // παίρνουμε τα δεδομένα
    const queryStr =`INSERT INTO books (author, title, genre, price) VALUES (?, ?, ?, ?)`;//query για το insert
    const parameters =[author, title, genre, price]; 

    try{
        await query(queryStr, parameters); //Εκτελούμε το query
        res.status(201).json({message:"Book added successfully"});
    } catch(err){
        console.error(err);
        res.status(500).json({ error: err.message});
    }
});

app.get('/books/:keyword',async (req, res)=>{    // get για το search
    const keyword =`%${req.params.keyword}%`;
    const queryStr ='SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';    //query for search
    const parameters =[keyword, keyword];

    try{
        const results = await query(queryStr, parameters); // Εκτελούμε το query
        res.json(results);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message});
    }
});

// Εναρξη του server
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});