# 🏆 Taktikal — Sports Coach Management & Performance Platform

**Production Link:** [https://taktikal.netlify.app/](https://taktikal.netlify.app/)

- **Frontend:** Netlify (`taktikal.netlify.app`)
- **Backend API:** Render (`https://s66-abhinav-capstone-taktikal.onrender.com`)
- Set Netlify env `VITE_API_BASE_URL=https://s66-abhinav-capstone-taktikal.onrender.com/api`
- Set Render env `CLIENT_URL=https://taktikal.netlify.app` and `NODE_ENV=production`

## 📌 Project Overview
Taktikal is a modern web application designed for sports coaches to manage team rosters across multiple sports (Football, Cricket, Volleyball, Handball, Rugby, Basketball, Chess, Table Tennis, Badminton), plan sport-specific tactics and training checklists, track athlete performance metrics over time, and consult an AI Sports Coach Assistant for drills and recovery strategies.

---

## ✨ Key Features
- 🔑 **Secure Authentication**: JWT + HttpOnly cookie authentication, rate-limited auth endpoints, and mass-assignment protection.
- 🏃 **Athlete Management**: Roster creation, position filtering, performance scoring, and search capabilities.
- 📈 **Performance Analytics**: Visual performance trends using Recharts with atomic dataset updating.
- 📋 **Tactics & Playbook Builder**: Sport-specific strategy presets, execution directives, and training checklists for all 9 supported sports.
- 🤖 **AI Coach Assistant**: Sports intelligence engine offering training plans, recovery guidance, and nutrition advice.
- ⚖️ **Legal Compliance**: Complete Terms of Service, Privacy Policy, and SEO metadata.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Recharts, React Router v7
- **Backend**: Node.js, Express 4, Mongoose 8, Helmet, Express-Rate-Limit, Morgan
- **Database**: MongoDB Atlas with compound indexes
- **Testing**: Vitest & Supertest integration suite

---

## 🚀 Local Setup & Development

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Configure Environment Variables
Copy `.env.example` in both `Server` and `Client` directories:
```bash
cp Server/.env.example Server/.env
cp Client/.env.example Client/.env
```

### 3. Run Development Servers
```bash
# Start Server & Client
npm run dev:server
npm run dev:client
```

### 4. Run Test Suite & Build Verification
```bash
# Run Server integration tests
npm run test:server

# Production build check
npm run build:client
```
