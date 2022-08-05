const router = require('express').Router();
const User = require('../../models/User');

router.post('/login', (req, res) => {
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;