import logging
import os
from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart
from app import keyboards as kb
from app.keyboards import create_specialists_keyboard, create_call_keyboard, create_questions_keyboard
from app.intro import intro_text
from app.core.data_loader import load_data
from app.question import text_quest, questions,answers


# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
router = Router()

# Загружаем данные
users, masters = load_data()
master_tg = 0  # Глобальная переменная для ID выбранного мастера

# --- Обработчик команды /start ---
@router.message(CommandStart())
async def cmd_start(message: Message):
    logging.info(f"Получена команда /start от {message.from_user.full_name}")
    await message.answer(
        intro_text, 
        reply_markup=kb.main
    )
    logging.info("Отправлено приветственное сообщение.")

# --- Обработчик текста 'Жалоба' ---
@router.message(F.text == 'Жалоба')
async def handle_complaint(message: Message):
    logging.info(f"Пользователь {message.from_user.full_name} выбрал 'Жалоба'")
    await message.answer(
        "Хорошо😥! Опишите свою проблему и в конце своего описания поставьте символ @. "
        "\nНаш менеджер в ближайшее время сам вам напишет!",
        reply_markup=kb.any_func,
    )
@router.message(F.text == 'Назад')
async def handle_back(message: Message):
    logging.info(f"Пользователь вернулся назад в меню")
    await message.answer(
        "Вы вернулись в главное меню;) Вам чем-нибудь еще помочь??",
        reply_markup=kb.main,
    )

# --- Обработчик текста с '@' ---
@router.message(F.text.contains('@'))
async def handle_complaint_received(message: Message):
    logging.info(f"Получена жалоба от {message.from_user.full_name}: {message.text}")
    await message.answer(
        "Спасибо, с вами свяжутся в ближайшее время!😉", 
        reply_markup=kb.any_func
    )
    await get_info_user(message, admin=True)

# --- Обработчик текста 'Мастера' ---
@router.message(F.text == 'Мастера')
async def handle_specialists(message: Message):
    logging.info(f"Пользователь {message.from_user.full_name} выбрал 'Мастера'")
    
    specialists_keyboard = create_specialists_keyboard(
        [u.full_name() for u in users.values() if any(m.user_id == u.user_id for m in masters)]
    )
    await message.answer(
        "Выберите специалиста:", 
        reply_markup=specialists_keyboard
    )

# --- Обработчик выбора мастера ---
@router.message(lambda message: message.text in [u.full_name() for u in users.values()])
async def handle_selected_specialist(message: Message):
    logging.info(f"Пользователь {message.from_user.full_name} выбрал специалиста: {message.text}")
    
    selected_user = next((u for u in users.values() if u.full_name() == message.text), None)
    if selected_user:
        selected_master = next((m for m in masters if m.user_id == selected_user.user_id), None)
        if selected_master:
            global master_tg  # Используем глобальную переменную для сохранения ID мастера
            master_tg = selected_master.tg_uid
            await message.answer(
                f"👨‍🔧 {selected_user.full_name()}\n"
                f"🔹 Специализация: {selected_master.specialization}\n"
                f"🔹 Опыт: {selected_master.years_of_experience} лет",
                reply_markup=create_call_keyboard()
            )
# --- Обработчик команды 'Вопросы' ---
@router.message(F.text == 'Вопросы')
async def cmd_quests(message: Message):
    await message.answer(
        text_quest,
        reply_markup=await create_questions_keyboard()
    )


# --- Обработка нажатия на вопрос ---
@router.callback_query(lambda call: call.data.startswith("question_"))
async def handle_question_callback(call: CallbackQuery):
    question_idx = int(call.data.split("_")[1]) - 1
    question_text = questions[question_idx]
    answer_text = answers[question_idx]
    await call.message.answer(f"**Вопрос:** {question_text}\n**Ответ:** {answer_text}", parse_mode="Markdown")
    await call.message.answer("Выберите следующий вопрос:", reply_markup=await create_questions_keyboard())
    await call.answer()
# --- Обработчик текста 'Связаться' ---
@router.message(F.text == 'Связаться')
async def handle_connect_with_specialist(message: Message):
    logging.info(f"Пользователь {message.from_user.full_name} хочет связаться с специалистом.")
    if master_tg == 0:  # Проверяем, был ли выбран мастер
        await message.answer("Сначала выберите мастера из списка.", reply_markup=kb.main)
        return
    await message.answer(
        "Напишите сообщение для специалиста, указав в конце символ '*'. Ваш специалист скоро свяжется с вами."
    )

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
