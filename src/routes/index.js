const { Router } = require('express');
const ReminderController = require('../controllers/reminder');

const router = Router();

router.use('/reminder', ReminderController);

module.exports = router;
