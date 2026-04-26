# Taskflow — CRUD App Demo

Full-stack CRUD application built with **Express.js** (backend) + **Vanilla JS** (frontend).

## 📁 Project Structure

```
crud-app/
├── server.js        # Express REST API
├── package.json     # Dependencies
├── public/
│   └── index.html   # Frontend (served as static files)
└── README.md
```

## 🚀 Run Locally

```bash
npm install
npm start
# → http://localhost:3000
```

## 🌐 Deploy to Render (Free)

1. Push this project to a **GitHub repository**
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo
4. Set the following:
   | Field | Value |
   |-------|-------|
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Plan** | Free |
5. Click **Deploy** — done! 🎉

> ⚠️ Note: This app uses **in-memory storage** (data resets on restart). For production, swap with a real DB like PostgreSQL or MongoDB.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/health` | Health check |

### Example: Create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My task", "description": "Details here", "priority": "high"}'
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, UUID
- **Frontend**: Vanilla JS, CSS (no framework)
- **Storage**: In-memory array (replace with DB for production)
