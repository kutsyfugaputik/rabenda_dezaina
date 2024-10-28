const { Services } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class ServiceController {
    async create(req, res) {
        const { service_type_id, name, duration, price, master_id } = req.body;
        const service = await Services.create({ service_type_id, name, duration, price, master_id });
        return res.json(service);
    }

    async getAll(req, res) {
        const services = await Services.findAll();
        return res.json(services);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const service = await Services.findOne({ where: { id } });
        if (!service) {
            return next(ApiError.notFound('Service not found'));
        }
        return res.json(service);
    }
}

module.exports = new ServiceController();
