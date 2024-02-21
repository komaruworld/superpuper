const channelUrl = "https://t.me/komaru_world";
const images = []; // Массив ссылок на изображения

// Функция для получения случайного изображения
function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

// Функция для обновления интерфейса
function updateUI() {
    document.getElementById("score").textContent = `Очки: ${score}`;
    document.getElementById("level").textContent = `Уровень: ${level}`;
}

// Обработчик события нажатия кнопки
document.getElementById("click-button").addEventListener("click", () => {
    // Увеличение очков
    score += level;

    // Увеличение уровня
    if (score >= level * 100) {
        level++;
    }

    // Отображение случайного изображения
    const imageElement = document.createElement("img");
    imageElement.src = getRandomImage();
    document.getElementById("image-gallery").appendChild(imageElement);

    // Обновление интерфейса
    updateUI();
});

// Загрузка изображений
fetch(`${channelUrl}/messages.json`)
    .then((response) => response.json())
    .then((data) => {
        for (const message of data["result"]["messages"]) {
            if ("photo" in message["media"]) {
                images.push(message["media"]["photo"]["sizes"][-1]["url"]);
            }
        }
    });

// Получение сохраненного прогресса
const savedScore = localStorage.getItem("score");
const savedLevel = localStorage.getItem("level");

if (savedScore && savedLevel) {
    score = parseInt(savedScore);
    level = parseInt(savedLevel);
}

// Обновление интерфейса
updateUI();

// Сохранение прогресса
setInterval(() => {
    localStorage.setItem("score", score);
    localStorage.setItem("level", level);
}, 1000);
