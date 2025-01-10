// Статические данные
const clients = [
    { name: "Иван Иванов", visits: 5 },
    { name: "Анна Смирнова", visits: 3 },
  ];
  
  const masters = [
    { name: "Ольга Петрова", specialty: "Парикмахер" },
    { name: "Сергей Кузнецов", specialty: "Косметолог" },
  ];
  
  const services = [
    { name: "Стрижка", price: "500₽" },
    { name: "Маникюр", price: "800₽" },
  ];
  
  const statistics = {
    totalClients: clients.length,
    totalRevenue: 50000,
    mostPopularService: "Стрижка",
    serviceData: {
      labels: ["Стрижка", "Маникюр", "Косметология"],
      data: [50, 30, 20],
    },
  };
  
  // Загрузка данных на панель
  window.onload = function loadDashboard() {
    const clientList = document.getElementById("client-list");
    clients.forEach(client => {
      const li = document.createElement("li");
      li.textContent = `${client.name} - Посещений: ${client.visits}`;
      clientList.appendChild(li);
    });
  
    const masterList = document.getElementById("master-list");
    masters.forEach(master => {
      const li = document.createElement("li");
      li.textContent = `${master.name} - Специализация: ${master.specialty}`;
      masterList.appendChild(li);
    });
  
    const serviceList = document.getElementById("service-list");
    services.forEach(service => {
      const li = document.createElement("li");
      li.textContent = `${service.name} - Цена: ${service.price}`;
      serviceList.appendChild(li);
    });
  
    renderStatisticsChart();
  };
  
  // Переключение разделов
  function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
  }
  
  // Диаграмма
  function renderStatisticsChart() {
    const ctx = document.getElementById("statistics-chart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: statistics.serviceData.labels,
        datasets: [{
          data: statistics.serviceData.data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        }],
      },
      options: {
        responsive: true,
      },
    });
  }
  
  // Добавление мастера
  function createMaster() {
    const name = prompt("Введите имя мастера:");
    const specialty = prompt("Введите специализацию мастера:");
    if (name && specialty) {
      masters.push({ name, specialty });
      alert("Мастер добавлен!");
      location.reload(); // Обновляем страницу для отображения нового мастера
    }
  }
  
  // Выход
  function logout() {
    window.location.href = "login.html";
  }