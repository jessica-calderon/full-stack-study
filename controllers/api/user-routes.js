/*
    user-routes.js
    Harrison L. (@Stratiz) & Contributors HERE
    Created on 08/06/2022 @ 05:56:05
    
    Description:
        Handles the routes for the user API.
    
    Documentation:
        /login : POST - {username : string, password : string}

        /logout : POST - {}

        
*/


const router = require('express').Router();
const User = require('../../models/User');
const { randomUUID } = require('crypto'); 

router.post('/login', (req, res) => {
    if (!req.cookies.auth) {
        res.cookie("auth", randomUUID(), { httpOnly: false });
        res.sendStatus(200); 
        console.log("User signed in!")
    } else {
        res.sendStatus(200);// Already signed in
    }
});

router.post('/logout', (req, res) => {
    res.cookie("auth", null, { httpOnly: false });
    res.sendStatus(200);
    
});

module.exports = router;