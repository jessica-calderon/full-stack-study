const router = require('express').Router();

router.use((req, res, next) => {
    if (!req.session.auth) {
        res.sendStatus(401);
    } else {
        next();
    }
});

router.post('/send', (req, res) => {
    let user = userManager.getUserByCookie(req.session.chatsession);
    if (user) {
        user.sendMessage(req.body.content);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;