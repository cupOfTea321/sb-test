# Сashа Test Project

> **Monorepo** (npm workspaces) — Frontend (React + Redux Toolkit) & Backend (Express, TypeScript). 100 % TypeScript.
>
> Мини‑проект демонстрирует кастомные UI‑компоненты («Select», «Button»), RTK Query, Fastify/Express API, единый ESLint/Prettier, Turborepo tasks  

---

## 📂 Дерево репозитория

```
apps/
  frontend/           # React 19 + RTK Query + Webpack 5
  backend/            # Express + tsx (ESM‑runtime)
packages/
  tsconfig/           # базовые ts‑настройки для всех пакетов
```

*Технологии →*<br>
• **React 19**, **Redux Toolkit 2 / RTK Query**  • **TypeScript 5**  • **Webpack 5**  • **Express 4**  • **TSX**  • **ESLint @typescript‑eslint**  • **Turborepo**  • **npm workspaces**

---

## 🚀 Быстрый старт

### 1 . Клонирование

```bash
git clone https://github.com/cupOfTea321/sb-test.git
cd sb_test
```

### 2 . Установка зависимостей

```bash
# ставит сразу все workspaces (frontend, backend, types)
npm install
```

### 3 . Дев‑режим

```bash
# запустить обе части параллельно
"dev": "concurrently -k -n FRONT,API -c cyan,magenta \"npm:dev:frontend\" \"npm:dev:backend\"",

# ⏩ или отдельно
npm run dev -w frontend   # http://localhost:3000
npm run dev -w backend    # http://localhost:4000
```

| Команда         | Что делает                                                       |
| --------------- | ---------------------------------------------------------------- |
| `npm run dev`   | Turborepo: backend (`tsx watch`) + frontend (`webpack serve`)    |
| `npm run build` | Prod‑cборка всего монорепо (typescript → dist, webpack → build/) |
| `npm run lint`  | ESLint + Prettier для всех пакетов                               |
| `npm run test`  | Заглушка для unit‑тестов                                         |

> **Порты:** Front `3000`, API `4000` (см. `.env` или `apps/backend/src/index.ts`).

Для удобства копируйте файлы‑шаблоны .env и меняйте под свой стенд.
apps/frontend/.env

Переменная VITE_API_URL
По‑умолчанию http://localhost:4000
Назначение Базовый URL запросов RTK Query (Webpack DefinePlugin пробрасывает в код как import.meta.env.VITE_API_URL).






---

## 🖥️ Frontend

* React 19 + Vite‑подобный конфиг Webpack (`webpack.dev.mjs / webpack.prod.mjs`)
* **Кастомный `Select`** — без `<select>`, с:

  * виртуальным списком (`react‑window`)
  * клавиатурной навигацией (Tab, ↑/↓, Enter, Esc)
  * авто‑открытием вверх/вниз
  * фильтрацией по префиксу и крестиком‑очисткой
* **RTK Query**

  * `GET /options` — 1000 опций (`name` = `value` = "1".."1000")
  * `POST /selected/option` — отправка выбранной
* FSD‑структура: `features/`, `shared/ui`, alias `@/…`

---

## ☕ Backend

* **Express 4** (ESM)
* `src/routes/options.ts` — отдаёт массив опций
* `src/routes/selected.ts` — принимает тело `{ value: "123" }` и отвечает `{"message": "… принята"}`
* Валидация входящих DTO через **Zod**
* Dev‑запуск: `tsx watch src/index.ts`

---

## 👷 Скрипты Turborepo

```json
{
  "pipeline": {
    "dev": {
      "cache": false,
      "parallel": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "lint": {}
  }
}
```
  

---

## 🛠️ Разработка

1. **Расширить API** — прописать эндпоинт в `backend/src/routes`, добавить хук в `services/api.ts`.
2. **UI** — атомы в `shared/ui`, feature‑композиции в `features/…`.
 
