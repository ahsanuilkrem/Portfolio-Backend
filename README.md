
📡 Portfolio Backend API

This is the backend API for the Personal Portfolio Website
, built using Node.js, Express.js, Prisma ORM, and JWT Authentication. It provides secure access to private content management (blogs, projects, user authentication) and exposes public endpoints for frontend consumption.

📌 Features
✅ Public API

Get all blog posts

Get individual blog post by slug

Get projects


🎯 Project Setup
1. Clone the repository
git clone https://github.com/ahsanuilkrem/Portfolio-Backend.git
cd portfolio-site

2. Install dependencies
# For frontend
cd client
npm install

# For backend
cd ../server
npm install


3. Environment Variables

Create .env files in both frontend and backend:

✅ server/.env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/your-db
JWT_SECRET=your_jwt_secret

✅ client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api

4. Run the Project
Start Backend
cd server
npx prisma migrate dev --name init
npm run dev

Start Frontend
cd client
npm run dev


📁 Project Structure
/src
│
├── routes/             # API endpoints
├── middleware/         # Auth + Error handling
├── models/             # Prisma schema (Prisma handles this)
├── utils/              # Helper functions (e.g., token generation)
├── prisma/             # Prisma client + seed file
├── index.ts            # Entry point
└── config/             # DB and environment configs