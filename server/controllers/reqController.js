// controllers/requestsController.js
const { Request, Status, Feedback, Discount, Service, Client } = require('../modules/modules');
// Импортируем модели для работы с таблицами базы данных, включая заявки, статусы, отзывы, скидки, услуги и клиентов.

class RequestsController {
  // 1. Создание новой заявки
  async createRequest(req, res) {
    console.log('Запрос на создание новой заявки получен.'); // Логируем начало создания заявки.

    const { clientId, serviceId, startTime, endTime, price, discountId } = req.body;
    // Извлекаем данные из тела запроса, включая ID клиента, ID услуги, время начала/окончания, цену и ID скидки.

    try {
      const newRequest = await Request.create({
        client_id: clientId, // Связываем заявку с клиентом.
        service_id: serviceId, // Связываем заявку с услугой.
        start_time: startTime, // Указываем время начала услуги.
        end_time: endTime, // Указываем предполагаемое время окончания.
        price, // Устанавливаем цену услуги.
        price_without_discount: price, // Сохраняем оригинальную цену без скидки.
        discount_id: discountId, // Привязываем скидку, если есть.
        created_at: new Date(), // Указываем время создания заявки.
        confirmation: false, // Устанавливаем статус "не подтверждена" по умолчанию.
      });

      console.log(`Заявка успешно создана: ${JSON.stringify(newRequest)}`); // Логируем созданную заявку.
      res.status(201).json(newRequest); // Отправляем клиенту информацию о созданной заявке.
    } catch (error) {
      console.error('Ошибка при создании заявки:', error); // Логируем ошибку, если что-то пошло не так.
      res.status(500).json({ message: 'Ошибка при создании заявки' }); // Отправляем клиенту сообщение об ошибке.
    }
  }

  // 2. Обновление заявки на "завершена"
  async updateToComplete(req, res) {
    console.log('Запрос на обновление заявки в статус "завершена" получен.'); // Логируем начало обновления заявки.

    const { requestId } = req.params; // Извлекаем ID заявки из параметров запроса.

    try {
      const request = await Request.findByPk(requestId); // Ищем заявку по ID.
      if (!request) {
        console.warn(`Заявка с ID ${requestId} не найдена.`); // Логируем предупреждение, если заявка не найдена.
        return res.status(404).json({ message: 'Заявка не найдена' }); // Отправляем ответ о ненайденной заявке.
      }

      await request.update({ status_id: 1, end_time: new Date() }); // Обновляем статус на "завершена" и фиксируем время завершения.
      console.log(`Заявка с ID ${requestId} успешно обновлена на статус "завершена".`); // Логируем успешное обновление.
      res.json({ message: 'Заявка успешно завершена' }); // Отправляем клиенту сообщение об успехе.
    } catch (error) {
      console.error('Ошибка при обновлении заявки:', error); // Логируем ошибку.
      res.status(500).json({ message: 'Ошибка при обновлении заявки' }); // Отправляем клиенту сообщение об ошибке.
    }
  }

  // 3. Обновление заявки на "отменена"
  async updateToCanceled(req, res) {
    console.log('Запрос на обновление заявки в статус "отменена" получен.'); // Логируем начало обновления.

    const { requestId } = req.params; // Извлекаем ID заявки из параметров запроса.

    try {
      const request = await Request.findByPk(requestId); // Ищем заявку по ID.
      if (!request) {
        console.warn(`Заявка с ID ${requestId} не найдена.`); // Логируем предупреждение.
        return res.status(404).json({ message: 'Заявка не найдена' }); // Отправляем сообщение об ошибке.
      }

      await request.update({ status_id: 2, canceled_at: new Date() }); // Обновляем статус на "отменена" и фиксируем время отмены.
      console.log(`Заявка с ID ${requestId} успешно обновлена на статус "отменена".`); // Логируем успешное обновление.
      res.json({ message: 'Заявка успешно отменена' }); // Отправляем сообщение об успехе.
    } catch (error) {
      console.error('Ошибка при отмене заявки:', error); // Логируем ошибку.
      res.status(500).json({ message: 'Ошибка при отмене заявки' }); // Отправляем сообщение об ошибке.
    }
  }

  // 4. Обновление заявки на "подтверждена"
  async updateToConfirm(req, res) {
    console.log('Запрос на подтверждение заявки получен.'); // Логируем начало подтверждения заявки.

    const { requestId } = req.params; // Извлекаем ID заявки из параметров запроса.

    try {
      const request = await Request.findByPk(requestId); // Ищем заявку по ID.
      if (!request) {
        console.warn(`Заявка с ID ${requestId} не найдена.`); // Логируем предупреждение.
        return res.status(404).json({ message: 'Заявка не найдена' }); // Отправляем сообщение об ошибке.
      }

      await request.update({ confirmation: true, status_id: 3 }); // Обновляем статус на "подтверждена" и устанавливаем подтверждение.
      console.log(`Заявка с ID ${requestId} успешно подтверждена.`); // Логируем успешное обновление.
      res.json({ message: 'Заявка успешно подтверждена' }); // Отправляем сообщение об успехе.
    } catch (error) {
      console.error('Ошибка при подтверждении заявки:', error); // Логируем ошибку.
      res.status(500).json({ message: 'Ошибка при подтверждении заявки' }); // Отправляем сообщение об ошибке.
    }
  }

  // 6. Получение информации о заявке
  async getRequest(req, res) {
    console.log('Запрос на получение информации о заявке получен.'); // Логируем начало получения заявки.

    const { requestId } = req.params; // Извлекаем ID заявки из параметров запроса.

    try {
      const request = await Request.findByPk(requestId, {
        include: [
          { model: Service, attributes: ['name', 'price', 'duration'] }, // Подключаем данные об услуге.
          { model: Client, attributes: ['user_id'] }, // Подключаем данные о клиенте.
          { model: Feedback, attributes: ['rating', 'text'] }, // Подключаем отзывы.
          { model: Discount, attributes: ['name', 'percentage'] }, // Подключаем информацию о скидках.
          { model: Status, attributes: ['name', 'description'] }, // Подключаем статус заявки.
        ],
      });

      if (!request) {
        console.warn(`Заявка с ID ${requestId} не найдена.`); // Логируем предупреждение.
        return res.status(404).json({ message: 'Заявка не найдена' }); // Отправляем сообщение об ошибке.
      }

      console.log(`Информация о заявке с ID ${requestId} успешно получена.`); // Логируем успешное получение заявки.
      res.json(request); // Отправляем данные о заявке клиенту.
    } catch (error) {
      console.error('Ошибка при получении информации о заявке:', error); // Логируем ошибку.
      res.status(500).json({ message: 'Ошибка при получении заявки' }); // Отправляем сообщение об ошибке.
    }
  }
}

module.exports = new RequestsController(); // Экспортируем экземпляр класса для использования в маршрутах.
