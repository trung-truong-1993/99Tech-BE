# Express + TypeScript + PostgreSQL CRUD API

This project is a simple CRUD backend built using **Express.js**, **TypeScript**, and **PostgreSQL** (with Prisma ORM). It allows users to create, read, update, and delete resources.

---

## 🚀 Features

- Built with Express.js + TypeScript
- PostgreSQL database with Prisma ORM
- Full CRUD API for `Resource` entity
- Environment variable support using `.env`
- Basic error handling and modular folder structure

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **ts-node-dev** for development

---

## 📁 Project Structure

```bash
project-root/
├── src/
│ ├── routes/
│ ├── controllers/
│ ├── prisma/
│ └── index.ts
├── prisma/
│ └── schema.prisma
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file based on the example:

```bash
cp .env.example .env
```

Edit the .env file and set your PostgreSQL credentials.

---

## 🧱 Prisma Setup
### 1. Initialize and Apply Migrations
```bash
npx prisma migrate dev --name init
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

---

## ▶️ Running the App
Development Server
```bash
npm run dev
```

Production Build
```bash
npm run build
npm start
```
---

## 📬 API Endpoints
| Method        | Endpoint         | Description             |
| ------------- | ---------------- | ----------------------- |
| POST          | /resources       | Create a new resource   |
| GET           | /resources       | List all resources      |
| GET           | /resources/:id   | Get resource by ID      |
| PUT           | /resources/:id   | Update resource by ID   |
| DELETE        | /resources/:id   | Delete resource by ID   |

📌 Example Payload
```bash
// POST /resources
{
  "name": "Sample Resource",
  "description": "This is a sample resource"
}
```
