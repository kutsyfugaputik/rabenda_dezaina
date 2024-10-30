const { Clients } = require('../modules/modules');
const ApiError = require('../error/ApiError');
 
class ClientsController {


    async getById(req, res, next) {
        const { id } = req.params;
        const clients = await Clients.findOne({ where: { id } });
        if (!clients) {
            return next(ApiError.notFound('Service Type not found'));
        }
        return res.json(clients);
    }
}

module.exports = new ClientsController();