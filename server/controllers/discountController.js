const { Discount } = require('../modules/tables/discount');
const ApiError = require('../error/ApiError.js');

class DiscountController {
    async create(req, res) {
        const { name, percentage, description, start_date, end_date } = req.body;
        const discount = await Discount.create({ name, percentage, description, start_date, end_date });
        return res.json(discount);
    }

    async getAll(req, res) {
        const discounts = await Discount.findAll();
        return res.json(discounts);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const discount = await Discount.findOne({ where: { id } });
        if (!discount) {
            return next(ApiError.notFound('Discount not found'));
        }
        return res.json(discount);
    }
}

module.exports = new DiscountController();
