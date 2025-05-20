
---

# Rabenda Dezaina

**Rabenda Dezaina** — мультикомпонентный проект с серверной частью, Telegram-ботом и двумя Android-приложениями: для клиентов и мастеров.

---

## ⚙️ Основной стек

* **Node.js** — сервер и бот
* **SQL** — база данных
* **Android (Fluuter)** — клиент и мастер-приложения
* **Telegram Bot API** — взаимодействие с пользователями

---

## 🧭 Структура проекта

```
rabenda_dezaina/
├── bot/             # Telegram-бот (Node.js)
├── client/          # APK-файл клиентского приложения
├── master/          # APK-файл приложения для мастеров
├── server/          # Серверная часть (Node.js + SQL)
├── rabenda.sql      # SQL-скрипт структуры базы данных
├── rabenda.backup   # Дамп базы данных
└── .gitignore       # Исключения для Git
```

---

## 🚀 Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/kutsyfugaputik/rabenda_dezaina.git
cd rabenda_dezaina
```

### 2. Установите зависимости

```bash
cd server && npm install
cd ../bot && npm install
```

### 3. Настройте базу данных

```bash
# Пример для PostgreSQL
createdb rabenda_db
psql -d rabenda_db -f rabenda.sql
```

### 4. Запустите сервер

```bash
cd server
node index.js
```

### 5. Запустите Telegram-бота

```bash
cd ../bot
node index.js
```

> Убедитесь, что настроены переменные окружения: токен бота, параметры подключения к БД и т.д.

---

## 📱 Установка мобильных приложений

* **Клиентское приложение**: [`client/app-release.apk`](client/app-release.apk)
* **Приложение мастера**: [`master/app-release.apk`](master/app-release.apk)

> Установите вручную на Android-устройство. Включите установку из неизвестных источников.

---

## ✅ Возможности

* Регистрация и авторизация
* Бронирование и управление заявками
* Управление услугами и расписанием
* Telegram-бот с интерактивными функциями
* Работа с SQL-базой данных

---

## 🧑‍💻 Вклад в проект

Добро пожаловать! Чтобы внести изменения:

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b my-feature`
3. Внесите правки
4. Оформите pull request

---

## 📄 Лицензия

Этот проект распространяется под лицензией [MIT](LICENSE).

---
## Связанные репзетории
### прошлая версия мобильного приложения и его код (самая первая версия)
https://github.com/kutsyfugaputik/phen_ 

### код мобильного приложения для клиента
https://github.com/kutsyfugaputik/phen_for_clients

### код мобильного приложения для клиента
https://github.com/kutsyfugaputik/phen_for_masters
---
###Автор
Разработала проект: Гонтарева Юлия Александровна(kutsyfugaputik) Контактные данные: dep2015tea@gmail.com


