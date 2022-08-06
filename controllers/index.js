const router = require('express').Router();
const apiRoutes = require('./api');
const chatRoutes = require('./chat');

router.use('/chat', chatRoutes);
router.use('/api', apiRoutes);

module.exports = router;