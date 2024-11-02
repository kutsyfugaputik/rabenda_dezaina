// routes/requests_routes.js
const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/reqController');

// Роуты для заявок
router.post('/create', requestsController.createRequest);
router.put('/:requestId/complete', requestsController.updateToComplete);
router.put('/:requestId/cancel', requestsController.updateToCanceled);
router.put('/:requestId/confirm', requestsController.updateToConfirm);
router.get('/:requestId', requestsController.getRequest);

module.exports = router;