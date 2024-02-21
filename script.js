const channelUrl = "https://t.me/komaru_world";

const postElement = document.getElementById("post");
const postTitleElement = document.getElementById("post-title");
const postTextElement = document.getElementById("post-text");
const postImageElement = document.getElementById("post-image");
const postHashtagsElement = document.getElementById("post-hashtags");
const postLinkElement = document.getElementById("post-link");

function getRandomPost() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${channelUrl}/messages.json`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const totalPosts = data["result"]["total_count"];
                const randomPostNumber = Math.floor(Math.random() * totalPosts) + 1;
                resolve(randomPostNumber);
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

function getPostInfo(postNumber) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${channelUrl}/messages/${postNumber}`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const post = data["result"]["message"];
                resolve(post);
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

function showPost(post) {
    postTitleElement.textContent = post["text"].slice(0, 30) + "...";
    postTextElement.textContent = post["text"];
    if ("photo" in post["media"]) {
        postImageElement.src = post["media"]["photo"]["sizes"][-1]["url"];
        postImageElement.style.display = "block";
    } else {
        postImageElement.style.display = "none";
    }
    postHashtagsElement.innerHTML = "";
    for (const hashtag of post["entities"]["hashtags"]) {
        const hashtagElement = document.createElement("li");
        hashtagElement.textContent = `#${hashtag["text"]}`;
        postHashtagsElement.appendChild(hashtagElement);
    }
    postLinkElement.href = `${channelUrl}/${post["id"]}`;
}

getRandomPost()
    .then((postNumber) => getPostInfo(postNumber))
    .then((post) => showPost(post))
    .catch((error) => {
        console.error(error);
        postElement.innerHTML = `<p>Ошибка: ${error.message}</p>`;
    });

