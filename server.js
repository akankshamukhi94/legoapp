// server.js

/********************************************************************************
* WEB322 – Assignment 02
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: ______________________ Student ID: ______________ Date: ______________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require("express");
const legoData = require("./modules/legoSets");

const app = express();
const PORT = 3000;

// Initialize the sets array
legoData.initialize()
    .then(() => {
        // Define routes
        app.get("/", (req, res) => {
            res.send("Assignment 2: Akanksha Mukhi - 155514227");
        });

        app.get("/lego/sets", (req, res) => {
            legoData.getAllSets()
                .then(sets => res.json(sets))
                .catch(err => res.status(500).send(err));
        });

        app.get("/lego/sets/num-demo", (req, res) => {
            legoData.getSetByNum("10307-1") 
                .then(set => res.json(set))
                .catch(err => res.status(404).send(err));
        });

        app.get("/lego/sets/theme-demo", (req, res) => {
            legoData.getSetsByTheme("tech") 
                .then(sets => res.json(sets))
                .catch(err => res.status(404).send(err));
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize Lego data:", err);
    });
