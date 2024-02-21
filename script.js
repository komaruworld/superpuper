const wall = document.getElementById('wall');
const newPostForm = document.getElementById('new-post');
const lastPostTime = Date.now();

const fetchData = async () => {
  const response = await fetch('data.json');
  const data = await response.json();

  // Отобразить записи на странице
  for (const post of data) {
    // ... код для создания и отображения записи ...
  }
};

fetchData();

newPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const now = Date.now();
  if (now - lastPostTime < 5000) {
    // Ограничение на частоту публикации
    return;
  }
  lastPostTime = now;

  const author = event.target.author.value;
  const message = event.target.message.value;

  const data = {
    author,
    message,
  };

  const response = await fetch('data.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // Запись успешно добавлена
    // ... код для добавления записи на "стену" ...

    // Очистить форму
    event.target.author.value = '';
    event.target.message.value = '';
  } else {
    // Ошибка при добавлении записи
    // ... обработать ошибку ...
  }
});

// Функция для добавления записи на "стену"
const addPost = (author, message) => {
  const post = document.createElement('div');
  post.classList.add('post');

  const authorElement = document.createElement('div');
  authorElement.classList.add('author');
  authorElement.innerHTML = `<p>**Ник:** <span>${author
                                                 
