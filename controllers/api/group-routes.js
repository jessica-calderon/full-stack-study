const router = require('express').Router();
const { randomUUID } = require('crypto'); 
const userManager = require('../../managers/user-manager');
const groupManager = require('../../managers/group-manager');

router.use((req, res, next) => {
    if (!req.session.auth) {
        res.sendStatus(401);
    } else {
        next();
    }
});

function joinGroup(groupId, req, res) {
    let targetGroup = groupManager.getGroup(groupId);
    if (targetGroup) {
        
        let user = userManager.getUserByCookie(req.session.chatsession);
        if (user) {
            user.destroy();
        }

        let newUser = targetGroup.addUser(req.session.TODO);
        res.cookie("chatsession", newUser.chatSessionCookie, { httpOnly: false });
        res.json(targetGroup.export());
    } else {
        res.sendStatus(400);
    }
    res.sendStatus(200);
}

router.post('/create', (req, res) => {
    const { title } = req.body; //TODO: secure this so users cant keep creating groups just because they're signed in.
    let newGroup = groupManager.newGroup(title);
    joinGroup(newGroup.id, req, res);
});

router.post('/join', (req, res) => {
    joinGroup(req.params.groupId, req, res);
});

router.post('/leave', (req, res) => {
    let user = userManager.getUserByCookie(req.session.chatsession);
    if (user) {
        user.destroy();
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;