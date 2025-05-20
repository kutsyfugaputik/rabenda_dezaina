import pytest
from unittest.mock import AsyncMock, MagicMock
from app.handlers import (
    cmd_start,
    handle_complaint,
    handle_selected_specialist,
    handle_complaint_received,
    handle_helping_write_to_master,
    handle_message_with_star,
    cmd_quests,
    handle_about_company
)

@pytest.fixture
def message():
    msg = MagicMock()
    msg.from_user.full_name = "Test User"
    msg.from_user.first_name = "Test"
    msg.from_user.last_name = "User"
    msg.from_user.username = "testuser"
    msg.bot = AsyncMock()
    msg.answer = AsyncMock()
    msg.text = ""
    return msg

@pytest.mark.asyncio
async def test_start_command(message):
    await cmd_start(message)
    message.answer.assert_called_once()
    assert "Test User" in message.answer.call_args[0][0]

@pytest.mark.asyncio
async def test_complaint_flow(message):
    await handle_complaint(message)
    message.answer.assert_called_once()
    assert "как правильно написать жалобу".lower() in message.answer.call_args[0][0].lower()

@pytest.mark.asyncio
async def test_complaint_message_with_at_symbol(message, monkeypatch):
    monkeypatch.setenv("ADMIN_ID", "123456")
    message.text = "Мастер опоздал на 30 минут.@"
    await handle_complaint_received(message)
    assert "Спасибо" in message.answer.call_args[0][0]

@pytest.mark.asyncio
async def test_about_company_message(message):
    message.text = "О компании"
    await handle_about_company(message)
    message.answer.assert_called_once()
    assert '''место, где красота встречается с искусством!''' in message.answer.call_args[0][0]
