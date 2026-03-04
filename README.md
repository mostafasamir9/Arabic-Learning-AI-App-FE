# 🌙 Arabic Learning AI App — Frontend

> The Angular client application for the Arabic Learning AI App — a web interface where users write Arabic posts, get AI-powered English translations, toggle translation visibility, and listen to audio playback.

---

## 📖 Overview

**Arabic Learning AI App FE** is the frontend companion to the [Arabic Learning AI App backend](https://github.com/mostafasamir9/Arabic-Learning-AI-App). Built with Angular, it provides a clean, interactive UI where learners can write Arabic text, receive AI-generated English translations, and control their learning experience through show/hide and audio features.

---

## ✨ Features

- ✍️ **Write Arabic Posts** — A text input interface for composing Arabic content
- 🤖 **AI Translation Display** — Shows the AI-generated English translation fetched from the backend
- 👁️ **Show / Hide Translation** — Toggle button to reveal or conceal the English translation per post
- 🔊 **Audio Playback** — Play button to listen to the translation read aloud
- 📱 **Responsive UI** — Clean, styled interface built with Angular and CSS
- 🐳 **Docker + Nginx** — Production-ready containerized deployment via Nginx

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 12 |
| Language | TypeScript |
| Styling | CSS |
| Server (prod) | Nginx |
| Containerization | Docker |
| Testing | Karma |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Angular CLI](https://angular.io/cli) v12

```bash
npm install -g @angular/cli@12
```

### Clone the Repository

```bash
git clone https://github.com/mostafasamir9/Arabic-Learning-AI-App-FE.git
cd Arabic-Learning-AI-App-FE
```

### Install Dependencies

```bash
npm install
```

### Configure the Backend URL

Update the API base URL to point to your running backend in the environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### Run Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload on file changes.

---

## 🏗️ Build for Production

```bash
ng build --configuration production
```

Build artifacts will be output to the `dist/` directory.

---

## 🐳 Docker Deployment

The app is served via **Nginx** in production using Docker.

```bash
# Build the image
docker build -t arabic-learning-fe .

# Run the container
docker run -p 80:80 arabic-learning-fe
```

The app will be available at `http://localhost`.

---
