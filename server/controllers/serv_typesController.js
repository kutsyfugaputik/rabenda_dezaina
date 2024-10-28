const { ServiceTypes } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class ServiceTypeController {
    async create(req, res) {
        const { name, description } = req.body;
        const serviceType = await ServiceTypes.create({ name, description });
        return res.json(serviceType);
    }

    async getAll(req, res) {
        const serviceTypes = await ServiceTypes.findAll();
        return res.json(serviceTypes);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const serviceType = await ServiceTypes.findOne({ where: { id } });
        if (!serviceType) {
            return next(ApiError.notFound('Service Type not found'));
        }
        return res.json(serviceType);
    }
}

module.exports = new ServiceTypeController();