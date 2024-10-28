const { ServiceType } = require('../modules/tables/serv_types');
const ApiError = require('../error/ApiError.js');

class ServiceTypeController {
    async create(req, res) {
        const { name, description } = req.body;
        const serviceType = await ServiceType.create({ name, description });
        return res.json(serviceType);
    }

    async getAll(req, res) {
        const serviceTypes = await ServiceType.findAll();
        return res.json(serviceTypes);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const serviceType = await ServiceType.findOne({ where: { id } });
        if (!serviceType) {
            return next(ApiError.notFound('Service Type not found'));
        }
        return res.json(serviceType);
    }
}

module.exports = new ServiceTypeController();