const { ServiceTypes } = require('../modules/modules'); // Импортируем модель типов услуг.
const ApiError = require('../error/ApiError'); // Импортируем кастомный класс ошибок.
const logAction = require('../utils/logger'); // Импортируем логгер для записи действий.

class ServiceTypeController {
  // Метод для получения всех типов услуг
  async getAll(req, res, next) {
    logAction('📥 Запрос на получение всех типов услуг'); // Лог начала запроса

    try {
      const serviceTypes = await ServiceTypes.findAll(); // Извлекаем все типы услуг из БД

      logAction(`✅ Получено ${serviceTypes.length} типов услуг`); // Лог успешного получения данных
      return res.json(serviceTypes); // Отправляем клиенту массив типов услуг
    } catch (error) {
      logAction(`❌ Ошибка при получении типов услуг: ${error.message}`, '🚨'); // Лог ошибки
      return next(ApiError.internal('Ошибка при получении типов услуг')); // Пробрасываем ошибку дальше через ApiError
    }
  }

  // Метод для получения одного типа услуги по ID
  async getById(req, res, next) {
    logAction('🔍 Запрос на получение типа услуги по ID'); // Лог начала запроса

    const { service_type_id } = req.params; // Извлекаем ID из параметров маршрута
    logAction(`🔎 Поиск типа услуги с ID: ${service_type_id}`); // Лог ID, по которому идет поиск

    try {
      const serviceType = await ServiceTypes.findOne({
        where: { service_type_id } // Условие поиска по ID
      });

      if (!serviceType) {
        logAction(`⚠️ Тип услуги с ID ${service_type_id} не найден`); // Лог отсутствия результата
        return next(ApiError.notFound('Тип услуги не найден')); // Пробрасываем 404 ошибку
      }

      logAction(`✅ Тип услуги с ID ${service_type_id} найден: ${JSON.stringify(serviceType)}`); // Лог найденной записи
      return res.json(serviceType); // Возвращаем найденную запись клиенту
    } catch (error) {
      logAction(`❌ Ошибка при поиске типа услуги: ${error.message}`, '🚨'); // Лог ошибки
      return next(ApiError.internal('Ошибка при поиске типа услуги')); // Пробрасываем 500 ошибку
    }
  }
}

module.exports = new ServiceTypeController(); // Экспортируем экземпляр контроллера
