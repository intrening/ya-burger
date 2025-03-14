# Ya Burger

Веб-приложение для заказа бургеров с интерактивным конструктором. Проект разработан с использованием React, TypeScript и кастомной настройки Webpack.

## Автор

**Имя:** Николай Волосянков
**GitHub:** [intrening](https://github.com/intrening)

## Технологии

- React 18
- ESLint и Stylelint для линтинга
- Prettier для форматирования кода
- Компоненты из @ya.praktikum/react-developer-burger-ui-components
- Redux для управления состоянием
- DnD для перетаскивания ингредиентов

## Как запустить проект

### Предварительные требования

- Node.js (версия 18.x или выше)
- Yarn или npm

### Установка зависимостей

```bash
# Используя npm
npm install

# Используя yarn
yarn
```

### Запуск в режиме разработки

```bash
# Используя npm
npm start

# Используя yarn
yarn start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

### Сборка для продакшена

```bash
# Используя npm
npm run build

# Используя yarn
yarn build
```

## Запуск тестов

### Модульные тесты

```bash
# Используя npm
npm test

# Используя yarn
yarn test
```

### E2E тесты (Cypress)

```bash
# Используя npm
npm run cypress

# Используя yarn
yarn cypress
```

## Дополнительные скрипты

```bash
# Проверка и исправление стилей
npm run stylelint:fix

# Проверка и исправление кода
npm run lint

# Форматирование кода
npm run format

# Запуск всех проверок
npm run check
```
