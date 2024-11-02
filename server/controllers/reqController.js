// controllers/requestsController.js
const { Request, Status, Feedback, Discount, Service, Client } = require('../modules/modules');

class RequestsController {
  // 1. Создание новой заявки
  async createRequest(req, res) {
    const { clientId, serviceId, startTime, endTime, price, discountId } = req.body;

    try {
      const newRequest = await Request.create({
        client_id: clientId,
        service_id: serviceId,
        start_time: startTime,
        end_time: endTime,
        price,
        price_without_discount: price,
        discount_id: discountId,
        created_at: new Date(),
        confirmation: false,
      });

      res.status(201).json(newRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при создании заявки' });
    }
  }

  // 2. Обновление заявки на "завершена"
  async updateToComplete(req, res) {
    const { requestId } = req.params;

    try {
      const request = await Request.findByPk(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Заявка не найдена' });
      }

      await request.update({ status_id: 1, end_time: new Date() });
      res.json({ message: 'Заявка успешно завершена' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении заявки' });
    }
  }

  // 3. Обновление заявки на "отменена"
  async updateToCanceled(req, res) {
    const { requestId } = req.params;

    try {
      const request = await Request.findByPk(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Заявка не найдена' });
      }

      await request.update({ status_id: 2, canceled_at: new Date() });
      res.json({ message: 'Заявка успешно отменена' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при отмене заявки' });
    }
  }

  // 4. Обновление заявки на "подтверждена"
  async updateToConfirm(req, res) {
    const { requestId } = req.params;

    try {
      const request = await Request.findByPk(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Заявка не найдена' });
      }

      await request.update({ confirmation: true, status_id: 3 });
      res.json({ message: 'Заявка успешно подтверждена' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при подтверждении заявки' });
    }
  }

  

  // 6. Получение информации о заявке
  async getRequest(req, res) {
    const { requestId } = req.params;

    try {
      const request = await Request.findByPk(requestId, {
        include: [
          { model: Service, attributes: ['name', 'price', 'duration'] },
          { model: Client, attributes: ['user_id'] },
          { model: Feedback, attributes: ['rating', 'text'] },
          { model: Discount, attributes: ['name', 'percentage'] },
          { model: Status, attributes: ['name', 'description'] }
        ]
      });

      if (!request) {
        return res.status(404).json({ message: 'Заявка не найдена' });
      }

      res.json(request);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении заявки' });
    }
  }
}

module.exports = new RequestsController();