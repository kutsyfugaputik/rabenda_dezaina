const { Requests, Services, Clients, Feedback, Discounts, Statuses } = require('../modules/modules');
const { Sequelize } = require('sequelize'); // Импортируем Sequelize для работы с полями через псевдонимы
const logAction = require('../utils/logger'); // Логгер для записи действий
const ApiError = require('../error/ApiError'); // Кастомный класс ошибок API

class RequestsController {
  // 1. Создание новой заявки
  async createRequest(req, res, next) {
    logAction('📥 Получен запрос на создание новой заявки'); // Лог начала запроса

    const { client_id, service_id, start_time, end_time, price,price_without_discount, discount_id } = req.body;
    // Извлекаем нужные поля из тела запроса

    try {
      const newRequest = await Requests.create({
        client_id,
        status_id: 4, // Устанавливаем статус "новая заявка" по умолчанию
        service_id,
        start_time,
        end_time,
        price,
        price_without_discount: price_without_discount, 
        discount_id,
        created_at: new Date(), // Время создания заявки
        confirmation: false // Не подтверждено по умолчанию
      });

      logAction(`✅ Заявка создана: ${JSON.stringify(newRequest)}`); // Лог результата
      res.status(201).json(newRequest); // Отправка ответа клиенту
    } catch (error) {
      logAction(`❌ Ошибка при создании заявки: ${error.message}`, '🚨'); // Лог ошибки
      next(ApiError.internal('Ошибка при создании заявки')); // Обработка ошибки через ApiError
    }
  }

  // 2. Обновление заявки в статус "завершена"
  async updateToComplete(req, res, next) {
    logAction('🔁 Получен запрос на завершение заявки');

    const { request_id } = req.params;

    try {
      const request = await Requests.findByPk(request_id); // Поиск заявки
      if (!request) {
        logAction(`⚠️ Заявка с ID ${request_id} не найдена`);
        return next(ApiError.notFound('Заявка не найдена'));
      }

      await request.update({ status_id: 1, end_time: new Date() }); // Обновление статуса и времени окончания
      logAction(`✅ Заявка ${request_id} завершена`);
      res.json({ message: 'Заявка успешно завершена' });
    } catch (error) {
      logAction(`❌ Ошибка при завершении заявки: ${error.message}`, '🚨');
      next(ApiError.internal('Ошибка при обновлении заявки'));
    }
  }

  // 3. Обновление заявки на "отменена"
  async updateToCanceled(req, res, next) {
    logAction('❌ Получен запрос на отмену заявки');

    const { request_id } = req.params;

    try {
      const request = await Requests.findByPk(request_id);
      if (!request) {
        logAction(`⚠️ Заявка с ID ${request_id} не найдена`);
        return next(ApiError.notFound('Заявка не найдена'));
      }

      await request.update({ status_id: 2, canceled_at: new Date() });
      logAction(`🔕 Заявка ${request_id} отменена`);
      res.json({ message: 'Заявка успешно отменена' });
    } catch (error) {
      logAction(`❌ Ошибка при отмене заявки: ${error.message}`, '🚨');
      next(ApiError.internal('Ошибка при отмене заявки'));
    }
  }

  // 4. Обновление заявки на "подтверждена"
  async updateToConfirm(req, res, next) {
    logAction('📨 Получен запрос на подтверждение заявки');

    const { request_id } = req.params;

    try {
      const request = await Requests.findByPk(request_id);
      if (!request) {
        logAction(`⚠️ Заявка с ID ${request_id} не найдена`);
        return next(ApiError.notFound('Заявка не найдена'));
      }

      await request.update({ confirmation: true, status_id: 3 });
      logAction(`✅ Заявка ${request_id} подтверждена`);
      res.json({ message: 'Заявка успешно подтверждена' });
    } catch (error) {
      logAction(`❌ Ошибка при подтверждении заявки: ${error.message}`, '🚨');
      next(ApiError.internal('Ошибка при подтверждении заявки'));
    }
  }
async getRequestsByMaster(req, res, next) {
  logAction('🔎 Получен запрос на получение заявок по мастеру');

  const { master_id } = req.params;

  try {
    const requests = await Requests.findAll({
      attributes: [
        'request_id',
        'start_time',
        'end_time',
        'price',
        'confirmation',
        'client_id',
        'service_id',
        'status_id',
        'feedback_id',
        'discount_id'
      ],
      include: [
        {
          model: Services,
          as: 'Service',
          attributes: ['master_id'],
          where: { master_id },
          required: true
        },
        {
          model: Clients,
          as: 'Client',
          attributes: ['user_id'],
          required: false
        }
      ],
      raw: true // возвращает только плоские поля
    });

    if (!requests || requests.length === 0) {
      logAction(`⚠️ Заявки не найдены для мастера с ID ${master_id}`);
      return next(ApiError.notFound('Заявки не найдены для указанного мастера.'));
    }

    logAction(`📦 Найдено ${requests.length} заявок для мастера ${master_id}`);

    // Преобразуем данные в плоскую структуру
    const flatRequests = requests.map(request => {
      const flatRequest = {
        ...request,
        master_id: request['Service.master_id'],  // Перемещаем master_id на верхний уровень
        user_id: request['Client.user_id'],       // Перемещаем user_id на верхний уровень
      };

      // Удаляем старые вложенные поля
      delete flatRequest['Service.master_id'];
      delete flatRequest['Client.user_id'];

      return flatRequest;
    });

    res.json(flatRequests);
  } catch (error) {
    logAction(`❌ Ошибка при получении заявок по мастеру: ${error.message}`, '🚨');
    next(ApiError.internal('Ошибка при получении заявок по мастеру'));
  }
}


  // 6. Получение заявок по клиенту
  async getRequestsByClient(req, res, next) {
    logAction('🔍 Получен запрос на получение заявок по клиенту');

    const { client_id } = req.params;

    if (!client_id) {
      logAction('⚠️ client_id не указан');
      return next(ApiError.badRequest('client_id is required'));
    }

    try {
      const requests = await Requests.findAll({
        where: { client_id },
        include: [
          {
            model: Services,
            attributes: ['name', 'price', 'duration']
          },
          { model: Feedback, attributes: ['rating', 'text'] },
          { model: Discounts, attributes: ['name', 'percentage'] },
          { model: Statuses, attributes: ['name', 'description'] }
        ]
      });

      logAction(`📦 Найдено ${requests.length} заявок для клиента ${client_id}`);
      res.json(requests);
    } catch (error) {
      logAction(`❌ Ошибка при получении заявок по клиенту: ${error.message}`, '🚨');
      next(ApiError.internal('Ошибка при получении заявок по клиенту'));
    }
  }
}

module.exports = new RequestsController();
