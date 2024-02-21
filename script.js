const instagramUrl = "https://www.instagram.com/mugimeshi323/?hl=ru";

// Функция для получения случайного поста
function getRandomPost() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${instagramUrl}/feed/json/`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const posts = data["items"];
                const randomPost = posts[Math.floor(Math.random() * posts.length)];
                resolve(randomPost);
            } else {
                reject(new Error(`Ошибка получения данных: ${xhr.status}`));
            }
        };
        xhr.onerror = () => {
            reject(new Error("Ошибка соединения"));
        };
        xhr.send();
    });
}

// Функция для получения последнего поста
function getLastPost() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${instagramUrl}/feed/json/`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const posts = data["items"];
                const lastPost = posts[0];
                resolve(lastPost);
            } else {
                reject(new Error(`Ошибка получения данных: ${xhr.status}`));
            }
        };
        xhr.onerror = () => {
            reject(new Error("Ошибка соединения"));
        };
        xhr.send();
    });
}

// Функция для отображения поста
function showPost(post, element) {
    element.innerHTML = "";

    const imgElement = document.createElement("img");
    imgElement.src = post["image_versions2"]["candidates"][0]["url"];
    element.appendChild(imgElement);

    if ("caption" in post) {
        const captionElement = document.createElement("p");
        captionElement.textContent = post["caption"]["text"];
        element.appendChild(captionElement);
    }
}

// Отображение случайного поста
getRandomPost()
    .then((post) => showPost(post, document.getElementById("random-post")))
    .catch((error) => {
        console.error(error);
        document.getElementById("random-post").innerHTML = `<p>Ошибка: ${error.message}</p>`;
    });

// Отображение последнего поста
getLastPost()
    .then((post) => showPost(post, document.getElementById("last-post")))
    .catch((error) => {
        console.error(error);
        document.getElementById("last-
    });

// Отображение последнего поста
getLastPost()
    .then((post) => showPost(post, document.getElementById("last-post")))
    .catch((error) => {
        console.error(error);
        document.getElementById("last-
