const Router = require("express");
const router = new Router;

const clients_routes = require('../routes/clients_routes');
const discount_routes = require('../routes/discount_routes');
const feedback_routes = require('../routes/feedback_routes');
const masters_routes = require('../routes/masters_routes');
const reqs_routes = require('../routes/reqs_routes');
const serv_types_routes = require('../routes/serv_types_routes');
const services_routes = require('../routes/services_routes');
const statuses_routes = require('../routes/statuses_routes');
const users_routes = require('../routes/users_routes');


router.use('/clients',clients_routes);
router.use('/discount', discount_routes);
router.use('/feedbacks',feedback_routes);
router.use('/masters', masters_routes);
router.use('/reqs',reqs_routes);
router.use('/serv',services_routes);
router.use('/types',serv_types_routes);
router.use('/users',users_routes);
router.use('/statuses',statuses_routes);

module.exports=router;