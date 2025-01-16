import logging
from aiogram.types import (ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton)
from app.question import text_quest, questions,answers
# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Пример клавиатуры
any_func = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text='Назад')]
    ],
    resize_keyboard=True
)
logging.info("Клавиатура 'any_func' была создана.")

# --- Создание клавиатуры с вопросами ---
async def create_questions_keyboard():
    if not questions:  # Проверяем, есть ли вопросы
        return InlineKeyboardMarkup(inline_keyboard=[])  # Возвращаем пустую клавиатуру, если вопросов нет
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text=q, callback_data=f"question_{idx}")]
        for idx, q in enumerate(questions, start=1)
    ])
    logging.info(f"Создание клавиатуры с {len(questions)} вопросами.")
    return keyboard

# --- Main menu ---
main = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text='Жалоба'), KeyboardButton(text='Мастера'), KeyboardButton(text='Компания'),KeyboardButton(text='Вопросы')]
    ],
    resize_keyboard=True,
    input_field_placeholder="Выберите необходимый пункт меню..."
)
logging.info("Главное меню ('main') было создано с клавишами: Жалоба, Специалисты, Компания, Вопросы.")

def create_specialists_keyboard(specialists):
    """
    Создает клавиатуру для выбора специалистов.
    """
    logging.info(f"Создание клавиатуры специалистов с {len(specialists)} специалистами.")
    buttons = [KeyboardButton(text=name) for name in specialists]
    keyboard = ReplyKeyboardMarkup(
        keyboard=[buttons[i:i + 2] for i in range(0, len(buttons), 2)],
        resize_keyboard=True
    )
    logging.info("Клавиатура специалистов успешно создана.")
    return keyboard

def create_call_keyboard():
    """
    Создает клавиатуру для связи со специалистом.
    """
    logging.info("Создание клавиатуры для связи со специалистом.")
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text='Связаться'), KeyboardButton(text='Назад')]
        ],
        resize_keyboard=True
    )
    logging.info("Клавиатура для связи с специалистом успешно создана.")
    return keyboard

# --- Questions menu ---
how_ques = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text='Часто задаваемые вопросы')],
        [KeyboardButton(text='О компании')],
        [KeyboardButton(text='Назад')]
    ],
    resize_keyboard=True
)
logging.info("Меню вопросов ('how_ques') было создано с клавишами: Часто задаваемые вопросы, О компании, Назад.")
