# SKproffresume

Персональный сайт-резюме Светланы Кропачевой на позицию Operations Assistant.

## Структура

- `index.html` — разметка сайта.
- `styles.css` — визуальный стиль.
- `app.js` — логика отрисовки и RU/EN переключатель.
- `data.js` — **основной файл для редактирования контента без изменения HTML**.
- `assets/photo/` — фотографии.
- `assets/portfolio/` — изображения, PDF, DOC/DOCX, видео и другие материалы портфолио.
- `assets/recommendations/` — благодарственные письма и рекомендации.

## Как обновлять контент

Откройте `data.js` в GitHub → **Edit** → измените нужный текст/ссылки → **Commit changes**.

Для файлов портфолио:
1. Загрузите файл в `assets/portfolio/`.
2. Добавьте карточку в массив `portfolio` внутри `data.js`.
3. В поле `url` укажите путь, например `assets/portfolio/project.pdf`.

Для благодарственных писем используйте папку `assets/recommendations/` и массив `recommendations`.

## GitHub Pages

После появления файлов сайт можно опубликовать через **Settings → Pages → Deploy from a branch → main / root**.
