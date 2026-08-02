# Pixorate AI 🚀

Pixorate AI is an AI-powered content generation platform that analyzes uploaded images using Google Gemini Vision and generates platform-specific content.

## Features

- 🔐 User Authentication
- 🖼️ AI Image Analysis
- ✨ AI Caption Generation
- 📝 Blog Generation
- 📈 SEO Content
- 🎬 Script Generation
- 🌍 Multi-language Support
- 🎭 Multiple Tones
- 📱 Platform-specific Content
- 📋 Copy & Download Results

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Google Gemini API
- JWT Authentication
- Multer

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```