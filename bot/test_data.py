import pytest
from unittest.mock import patch
from app.core.data_loader import load_data
from app.core.models import User, Master

# --- Подготовка мок-данных ---

MOCK_USERS = [
    {
        "user_id": "31eb1d89-6baf-43a9-ae85-d5cb02cb4926",
        "first_name": "Александр",
        "last_name": "Иванов",
        "father_name": "Сергеевич"
    },
    {
        "user_id": "dbe7cb61-950b-4d42-951b-597be9783460",
        "first_name": "Мария",
        "last_name": "Петрова",
        "father_name": "Владимировна"
    }
]

MOCK_MASTERS = [
    {
        "user_id": "31eb1d89-6baf-43a9-ae85-d5cb02cb4926",
        "specialization": "Массажист",
        "years_of_experience": 5,
        "tg_uid": 786254617
    },
    {
        "user_id": "dbe7cb61-950b-4d42-951b-597be9783460",
        "specialization": "Косметолог",
        "years_of_experience": 3,
        "tg_uid": 786254617
    }
]

# --- Тест: успешная загрузка ---

@patch("app.core.data_loader.fetch_data")  # <-- исправленный путь
def test_load_data_success(mock_fetch):
    mock_fetch.side_effect = [MOCK_USERS, MOCK_MASTERS]

    users, masters = load_data()

    assert isinstance(users, dict)
    assert isinstance(masters, list)
    assert len(users) == 2
    assert len(masters) == 2

    assert users["31eb1d89-6baf-43a9-ae85-d5cb02cb4926"].full_name() == "Иванов Александр Сергеевич"
    assert masters[0].specialization == "Массажист"

# --- Тест: данные не получены (None) ---

@patch("app.core.data_loader.fetch_data")
def test_load_data_no_data(mock_fetch):
    mock_fetch.side_effect = [None, None]

    users, masters = load_data()
    assert users == []
    assert masters == []

# --- Тест: один мастер не имеет соответствующего пользователя ---
@patch("app.core.data_loader.fetch_data")
def test_load_data_master_missing_user(mock_fetch):
    master_with_invalid_user = [{
        "user_id": "not-in-users",
        "specialization": "Парикмахер",
        "years_of_experience": 4,
        "tg_uid": 111111
    }]
    mock_fetch.side_effect = [MOCK_USERS, master_with_invalid_user]

    users, masters = load_data()
    assert len(users) == 2
    # Мастер не игнорируется, если load_data этого не делает
    assert len(masters) == 1
    assert masters[0].user_id == "not-in-users"




