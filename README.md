# Pechkin Messenger

![Pechkin Messenger](/src/images/matroskin-square.png)

"Если бы у меня такой чат был, я и не женился бы никогда".

Уютный мессенджер, где молниеносная доставка ваших emodji — в руках Печкина.
Учебный проект курса «middle frontend-разработчик» от Яндекс.Практикума. Студент — Ярослав Старущенко.

**[Ссылка на макет](https://www.figma.com/file/kwyb3JD0tw9wrlqFyZbA1z/pechkin-messenger?node-id=0%3A1)**


## Назначение файлов и папок

```bash
src/                           # Ресурсы проекта
  components/                  # - компоненты проекта (включающие как правило, .html + .scss + .js)
    example/
        example.html
        example.js
        example.scss
  fonts/                       # - директория шрифтов проекта
  pages/                       # - список страниц проекта
  images/                      # - директория картинок фронтенда
  js/                          # - глобальные и вспомогательные скрипты, которые не относятся к компонентам
    script.js                  # - основной диспетчер скриптов проекта
    common.js                  # - общие инициализации скриптов для сайта
    constants.js               # - глобальные js-переменные, использумеые в разработке
    helpers.js                 # - переиспользуемые функции всего проекта
  layouts/                     # - шаблоны html-страниц
  scss/                        # - глобальные стилевые файлы 
     base/                     # - базовые стили для всего проекта
         fonts.scss            # - подключение и задание правил шрифтов
         mixins.scss           # - перечень примесей
         print.scss            # - стили для печати
         page.scss             # - стили для корневого элемента страницы (базовый лейаут)
         reset.scss            # - сброс стилей по умолчанию
         scaffolding.scss      # - общие стилевые правила для проекта
         variables.scss        # - описание используемых переменных
     style.scss                # - главный стилевой файл для импорта всех остальных
  data.json                    # - тестовые массивы данных, используемые в вёрстке
dist/                          # - папка сборки проекта
```

## Команды
- ` npm start` - запуск сервера для разработки (порт 3000)
- ` npm run build` - сборка проекта в папку `/dist` с оптимизацией ресурсов

## Стек
- `parcel` - упаковщик приложения
- `nunjucks` - шаблонизатор для сниппетов
- `sass + cssnano` - препроцессор стилей + оптимизация