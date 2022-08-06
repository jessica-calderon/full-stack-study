/*
    group-routes.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:57:04
    
    Description:
        Handles the routes for group API.
    
    Documentation:
        /join : POST - {groupId : string}

        /leave : POST - {}

        /create : POST - {groupName : string}

        /all : GET - {}
*/

const router = require('express').Router();

const userManager = require('../../subsystems/chat/userManager');
const groupManager = require('../../subsystems/chat/groupManager');

router.use((req, res, next) => {
    if (!req.cookies.auth) {
        console.log(req)
        res.sendStatus(401);
    } else {
        next();
    }
});

function joinGroup(groupId, req, res) {
    let targetGroup = groupManager.getGroup(groupId);
    if (targetGroup) {
        
        let user = userManager.getUserByCookie(req.cookies.chatsession);
        if (user) {
            user.destroy();
        }

        let newUser = userManager.addUser(req.cookies.auth);
        targetGroup.addUser(newUser);
        res.cookie("chatsession", newUser.chatSessionCookie, { httpOnly: false });
        res.json(targetGroup.export());
    } else {
        res.sendStatus(400);
    }
}

router.post('/create', (req, res) => {
    const { title } = req.body; //TODO: secure this so users cant keep creating groups just because they're signed in.
    let newGroup = groupManager.newGroup(title);
    joinGroup(newGroup.id, req, res);
});

router.post('/join', (req, res) => {
    joinGroup(req.body.groupId, req, res);
});

router.post('/leave', (req, res) => {
    let user = userManager.getUserByCookie(req.cookies.chatsession);
    if (user) {
        user.destroy();
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

router.get('/all', (req, res) => {
    res.json(groupManager.exportAll());
});


module.exports = router;