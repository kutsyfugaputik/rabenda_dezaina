const { DataTypes } = require('sequelize'); 
// Из модуля 'sequelize' импортируем объект DataTypes, который содержит типы данных для создания полей в таблице.

const sequelize = require('../db'); 
// Подключаем экземпляр Sequelize, который настроен для взаимодействия с базой данных. Путь к файлу конфигурации может быть другим, в зависимости от структуры проекта.

const Clients = require('./clients'); 
// Импортируем модель 'Clients' для работы с таблицей клиентов, для создания связи между клиентами и запросами.

const Services = require('./services'); 
// Импортируем модель 'Services' для работы с таблицей услуг, для указания, какая услуга запрашивается.

const Discounts = require('./discount'); 
// Импортируем модель 'Discounts' для работы с таблицей скидок, для указания, применяется ли скидка к запросу.

const Statuses = require('./statuses'); 
// Импортируем модель 'Statuses' для работы с таблицей статусов запросов, для отслеживания состояния запроса.

const Feedback = require('./feedback'); 
// Импортируем модель 'Feedback' для работы с таблицей отзывов, для указания, был ли оставлен отзыв о запросе.


// Requests Model
const Requests = sequelize.define('Requests', { 
  // Определяем модель для таблицы 'Requests'. Метод 'define' создаёт модель, которая будет соответствовать таблице в базе данных.

    request_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'request_id' — целое число.
      autoIncrement: true, 
      // Устанавливаем автоинкремент, чтобы значение 'request_id' увеличивалось автоматически при добавлении новой записи.
      primaryKey: true, 
      // Устанавливаем это поле как первичный ключ.
    },

    feedback_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'feedback_id' — целое число.
      allowNull: true, 
      // Указываем, что это поле может быть пустым, если отзыв не оставлен.
      references: { 
        model: Feedback, 
        // Устанавливаем связь с моделью 'Feedback'.
        key: 'feedback_id', 
        // Указываем, что поле 'feedback_id' в таблице 'Requests' связано с полем 'feedback_id' в таблице 'Feedback'.
      },
    },

    discount_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'discount_id' — целое число.
      allowNull: true, 
      // Указываем, что это поле может быть пустым, если скидка не применяется.
      references: { 
        model: Discounts, 
        // Устанавливаем связь с моделью 'Discounts'.
        key: 'discount_id', 
        // Указываем, что поле 'discount_id' в таблице 'Requests' связано с полем 'discount_id' в таблице 'Discounts'.
      },
    },

    service_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'service_id' — целое число.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения, так как услуга должна быть указана.
      references: { 
        model: Services, 
        // Устанавливаем связь с моделью 'Services'.
        key: 'service_id', 
        // Указываем, что поле 'service_id' в таблице 'Requests' связано с полем 'service_id' в таблице 'Services'.
      },
    },

    status_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'status_id' — целое число.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения, так как статус запроса должен быть указан.
      references: { 
        model: Statuses, 
        // Устанавливаем связь с моделью 'Statuses'.
        key: 'status_id', 
        // Указываем, что поле 'status_id' в таблице 'Requests' связано с полем 'status_id' в таблице 'Statuses'.
      },
    },

    start_time: { 
      type: DataTypes.DATE, 
      // Тип данных для поля 'start_time' — дата и время начала запроса.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения.
    },

    end_time: { 
      type: DataTypes.DATE, 
      // Тип данных для поля 'end_time' — дата и время окончания запроса.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения.
    },

    price: { 
      type: DataTypes.DECIMAL(10, 2), 
      // Тип данных для поля 'price' — десятичное число для хранения цены с точностью до двух знаков после запятой.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения.
    },

    price_without_discount: { 
      type: DataTypes.DECIMAL(10, 2), 
      // Тип данных для поля 'price_without_discount' — десятичное число для хранения цены без скидки.
      allowNull: true, 
      // Указываем, что это поле может быть пустым, если скидка не применяется.
    },

    created_at: { 
      type: DataTypes.DATE, 
      // Тип данных для поля 'created_at' — дата и время создания запроса.
      defaultValue: DataTypes.NOW, 
      // Устанавливаем значение по умолчанию — текущее время.
    },

    confirmation: { 
      type: DataTypes.BOOLEAN, 
      // Тип данных для поля 'confirmation' — булево значение, которое указывает, был ли запрос подтвержден.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения.
    },

    canceled_at: { 
      type: DataTypes.DATE, 
      // Тип данных для поля 'canceled_at' — дата и время отмены запроса.
      allowNull: true, 
      // Указываем, что это поле может быть пустым, если запрос не был отменен.
    },

    client_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'client_id' — целое число, которое указывает на клиента, сделавшего запрос.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения.
      references: { 
        model: Clients, 
        // Устанавливаем связь с моделью 'Clients'.
        key: 'client_id', 
        // Указываем, что поле 'client_id' в таблице 'Requests' связано с полем 'client_id' в таблице 'Clients'.
      },
    },

  }, {
    tableName: 'requests', 
    // Устанавливаем название таблицы в базе данных, которое будет соответствовать модели. Здесь таблица называется 'requests'.
    timestamps: false, 
    // Указываем, что не нужно автоматически добавлять столбцы 'createdAt' и 'updatedAt' (для отслеживания времени создания и последнего обновления записи).
  });
  
  module.exports = Requests; 
  // Экспортируем модель 'Requests' для использования в других частях приложения.
