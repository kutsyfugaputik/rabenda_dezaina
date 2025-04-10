// controllers/serviceTypeController.js
const { ServiceTypes } = require('../modules/modules'); // Импортируем модель типов услуг.
const ApiError = require('../error/ApiError'); // Импортируем класс для обработки ошибок API.

class ServiceTypeController {
  // Метод для получения всех типов услуг
  async getAll(req, res) {
    console.log('Запрос на получение всех типов услуг получен.'); // Логируем начало запроса.

    try {
      const serviceTypes = await ServiceTypes.findAll(); // Извлекаем все записи из таблицы типов услуг.
      console.log('Все типы услуг успешно получены.'); // Логируем успешное выполнение запроса.
      return res.json(serviceTypes); // Отправляем клиенту список типов услуг.
    } catch (error) {
      console.error('Ошибка при получении типов услуг:', error); // Логируем ошибку, если запрос не выполнен.
      return res.status(500).json({ message: 'Ошибка при получении типов услуг' }); // Отправляем сообщение об ошибке.
    }
  }

  // Метод для получения типа услуги по ID
  async getById(req, res, next) {
    console.log('Запрос на получение типа услуги по ID получен.'); // Логируем начало запроса.

    const { service_type_id } = req.params; // Извлекаем ID из параметров запроса.
    console.log(`Ищем тип услуги с ID: ${service_type_id}`); // Логируем ID, который ищется.

    try {
      const serviceType = await ServiceTypes.findOne({ where: {service_type_id} }); // Ищем запись по ID в таблице типов услуг.

      if (!serviceType) {
        console.warn(`Тип услуги с ID ${service_type_id} не найден.`); // Логируем предупреждение, если запись не найдена.
        return next(ApiError.notFound('Service Type not found')); // Возвращаем ошибку 404 через middleware.
      }

      console.log(`Тип услуги с ID ${service_type_id} успешно найден.`); // Логируем успешный поиск.
      return res.json(serviceType); // Отправляем найденный тип услуги клиенту.
    } catch (error) {
      console.error('Ошибка при поиске типа услуги:', error); // Логируем ошибку.
      return res.status(500).json({ message: 'Ошибка при поиске типа услуги' }); // Отправляем сообщение об ошибке.
    }
  }
}

module.exports = new ServiceTypeController(); // Экспортируем экземпляр контроллера.
