# Импортируем библиотеку для логирования
import logging
# Импортируем библиотеку для работы с операционной системой
import os
# Импортируем необходимые модули из aiogram
from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart
# Импортируем пользовательские модули и клавиатуры
from app import keyboards as kb
from app.keyboards import create_specialists_keyboard, create_call_keyboard, create_questions_keyboard
from app.information import intro_text, about_company
from app.core.data_loader import load_data
from app.question import text_quest, questions, answers

# Настройка логирования: вывод информации в консоль
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# Создаем объект маршрутизатора для управления хендлерами
router = Router()

# Загружаем данные о пользователях и мастерах
users, masters = load_data()
# Глобальная переменная для хранения Telegram ID выбранного мастера
master_tg = 0
master_name=0

# --- Обработчик команды /start ---
@router.message(CommandStart())
async def cmd_start(message: Message):
    # Логируем событие команды /start
    logging.info(f"Получена команда /start от {message.from_user.full_name}")
    # Отправляем приветственное сообщение с кнопками
    await message.answer(
       message.from_user.full_name + " " + intro_text, 
        reply_markup=kb.main
    )
    logging.info("Отправлено приветственное сообщение.")

# --- Обработчик текста 'Жалоба' ---
@router.message(F.text == 'Жалоба')
async def handle_complaint(message: Message):
    # Логируем выбор команды 'Жалоба'
    logging.info(f"Пользователь {message.from_user.full_name} выбрал 'Жалоба'")
    # Отправляем сообщение с инструкцией и клавиатурой
    await message.answer("😥 *Как правильно написать жалобу менеджеру?*\n\n"+
    "🔹 Опишите вашу проблему или недовольство максимально подробно. Например:\n"+
    "   - \"Я записался на стрижку, но мастер опоздал на 30 минут.\"\n"+
    "   - \"Услуга маникюра была выполнена некачественно.\"\n\n"+
    "🔹 В конце сообщения обязательно добавьте символ `@`, чтобы жалоба была передана менеджеру. Например:\n"+
    "   - \"Администратор был груб, прошу разобраться.@\"\n\n"+
    "❗ Мы внимательно относимся к каждой жалобе и свяжемся с вами в ближайшее время, чтобы решить проблему!",
        reply_markup=kb.any_func,
    )

# --- Обработчик текста 'Назад' ---
@router.message(F.text == 'Назад')
async def handle_back(message: Message):
    # Логируем возврат пользователя в главное меню
    logging.info(f"Пользователь вернулся назад в меню")
    # Отправляем сообщение о возврате в главное меню
    await message.answer(
        "Вы вернулись в главное меню;) Вам чем-нибудь еще помочь??",
        reply_markup=kb.main,
    )

# --- Обработчик текста с '@' ---
@router.message(F.text.contains('@'))
async def handle_complaint_received(message: Message):
    # Логируем получение жалобы от пользователя
    logging.info(f"Получена жалоба от {message.from_user.full_name}: {message.text}")
    # Отправляем сообщение о принятии жалобы
    await message.answer(
        "Спасибо, с вами свяжутся в ближайшее время!😉", 
        reply_markup=kb.any_func
    )
    # Передаем информацию администратору
    await get_info_user(message, admin=True)

# --- Обработчик текста 'Мастера' ---
@router.message(F.text == 'Мастера')
async def handle_specialists(message: Message):
    # Логируем выбор команды 'Мастера'
    logging.info(f"Пользователь {message.from_user.full_name} выбрал 'Мастера'")
    # Создаем клавиатуру с доступными мастерами
    specialists_keyboard = create_specialists_keyboard(
        [u.full_name() for u in users.values() if any(m.user_id == u.user_id for m in masters)]
    )
    # Отправляем сообщение с выбором мастера
    await message.answer(
        "Выберите специалиста:", 
        reply_markup=specialists_keyboard
    )

# --- Обработчик выбора мастера ---
@router.message(lambda message: message.text in [u.full_name() for u in users.values()])
async def handle_selected_specialist(message: Message):
    # Логируем выбор мастера
    logging.info(f"Пользователь {message.from_user.full_name} выбрал специалиста: {message.text}")
    # Ищем информацию о выбранном мастере
    selected_user = next((u for u in users.values() if u.full_name() == message.text), None)
    if selected_user:
        selected_master = next((m for m in masters if m.user_id == selected_user.user_id), None)
        if selected_master:
            # Сохраняем ID выбранного мастера в глобальной переменной
            global master_tg
            global master_name
            master_tg = selected_master.tg_uid
            master_name= f"{selected_user.full_name()}"
            # Отправляем информацию о мастере
            await message.answer(
                f"👨‍🔧 {selected_user.full_name()}\n"
                f"🔹 Специализация: {selected_master.specialization}\n"
                f"🔹 Опыт: {selected_master.years_of_experience} лет",
                reply_markup=create_call_keyboard()
            )
            

# --- Обработчик команды 'Вопросы' ---
@router.message(F.text == 'Вопросы')
async def cmd_quests(message: Message):
    # Отправляем текст с вопросами и кнопки
    await message.answer(
        text_quest,
        reply_markup=await create_questions_keyboard()
    )

# --- Обработчик команды 'О компании' ---
@router.message(F.text == 'Компания')
async def handle_about_company(message: Message):
    # Отправляем текст о компании
    await message.answer(
        about_company,
        reply_markup=kb.any_func
    )
# --- Обработчик команды 'Связаться' ---
@router.message(F.text == 'Связаться')
async def handle_helping_write_to_master(message: Message):
    # Отправляем текст о компании
    await message.answer(
        "Вы выбрали "+ master_name +
        "📝 *Как правильно написать запрос мастеру?*\n\n"
    "🔹 Опишите вашу проблему или пожелания как можно подробнее. Например:\n"
    "   - \"Интересует маникюр с дизайном, возможно ли сделать?\"\n\n"
    "🔹 В конце сообщения обязательно добавьте символ `*`, чтобы мастер знал, что это ваш запрос. Например:\n"
    "   - \"Можно ли записаться на окрашивание волос?*\"\n\n"
    "❗ Это важно, чтобы сообщение корректно отправилось мастеру и он смог быстрее с вами связаться!",
    reply_markup=kb.any_func
        
    )

# --- Обработка нажатия на вопрос ---
@router.callback_query(lambda call: call.data.startswith("question_"))
async def handle_question_callback(call: CallbackQuery):
    # Определяем индекс вопроса
    question_idx = int(call.data.split("_")[1]) - 1
    question_text = questions[question_idx]
    answer_text = answers[question_idx]
    # Отправляем текст вопроса и ответа
    await call.message.answer(f"**Вопрос:** {question_text}\n**Ответ:** {answer_text}", parse_mode="Markdown")
    # Предлагаем выбрать следующий вопрос
    await call.message.answer("Выберите следующий вопрос:", reply_markup=await create_questions_keyboard())
    await call.answer()

# --- Обработчик текста с '*' ---
@router.message(F.text.endswith('*'))
async def handle_message_with_star(message: Message):
    logging.info(f"Получено сообщение с символом '*' в конце от {message.from_user.full_name}: {message.text}")
    
    if master_tg == 0:  # Проверяем, был ли выбран мастер
        await message.answer("Сначала выберите мастера из списка.", reply_markup=kb.main)
        return

    await message.bot.send_message(
        master_tg,
        f"Новое сообщение от клиента:\n"
        f"{message.text}\n"
        f"От: {message.from_user.first_name} {message.from_user.last_name}\n"
        f"Username: @{message.from_user.username}"
    )
    await message.answer(
        "Спасибо, ваше сообщение отправлено специалисту! 😊",
        reply_markup=kb.any_func,
    )
# --- Обработчик неизвестного текста ' ---
@router.message(F.text )
async def handle_other_text(message: Message):
    # Отправляем сообщение о возврате в главное меню
    await message.answer("""Извините, на данный момен я еще не научилась таким командам. :( 
 Пожалуйста, воспользуйтесь меню-подсказками на вашей клавиатуре!😊🌸""",
        reply_markup=kb.main,
    )
# --- Уведомление администратору или мастеру ---
async def get_info_user(message: Message, admin: bool):
    bot = message.bot
    if admin:
        admin_id = os.getenv('ADMIN_ID')
        if not admin_id:
            logging.error("Не задан ADMIN_ID в переменных окружения.")
            return
        logging.info(f"Отправка жалобы администратору от {message.from_user.full_name}")
        await bot.send_message(
            admin_id,
            f"Менеджер вам послал жалобу!😮\n"
            f"{message.text}\n"
            f"От: {message.from_user.first_name} {message.from_user.last_name}\n"
            f"Username: @{message.from_user.username}",
        )
    else:
        if master_tg == 0:
            logging.error("Мастер не выбран для отправки сообщения.")
            return
        logging.info(f"Отправка сообщения мастеру от {message.from_user.full_name}")
        await bot.send_message(
            master_tg,
            f"Вам сообщение от клиента!😮\n"
            f"{message.text}\n"
            f"От: {message.from_user.first_name} {message.from_user.last_name}\n"
            f"Username: @{message.from_user.username}",
        )
