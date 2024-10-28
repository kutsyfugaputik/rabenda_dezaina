const { Service } = require('../modules/tables/services');
const ApiError = require('../error/ApiError.js');

class ServiceController {
    async create(req, res) {
        const { service_type_id, name, duration, price, master_id } = req.body;
        const service = await Service.create({ service_type_id, name, duration, price, master_id });
        return res.json(service);
    }

    async getAll(req, res) {
        const services = await Service.findAll();
        return res.json(services);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const service = await Service.findOne({ where: { id } });
        if (!service) {
            return next(ApiError.notFound('Service not found'));
        }
        return res.json(service);
    }
}

module.exports = new ServiceController();
