/*
    chat-routes.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 06:02:34
    
    Description:
        Handles the routes for the chat API.
    
    Documentation:
        /send : POST - {content : string}
*/

const router = require('express').Router();
const userManager = require('../../subsystems/chat/userManager');

router.use((req, res, next) => {
    if (!req.cookies.auth) {
        res.sendStatus(401);
    } else {
        next();
    }
});

router.post('/send', (req, res) => {
    let user = userManager.getUserByCookie(req.cookies.chatsession);
    if (user) {
        user.sendMessage(req.body.content);
        console.log(req.body.content);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;