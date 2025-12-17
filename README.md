# MongoDB Category Task

## Setup Instructions

### Prerequisites
- MongoDB running locally on port 27017
- Node.js 18.x

### Backend Setup
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
App runs on http://localhost:3000

### API Endpoints
- GET http://localhost:5000/api/seed - Seeds database with 2 categories
- GET http://localhost:5000/api/categories - Returns all categories

### Testing
1. Start MongoDB
2. Start backend server
3. Visit http://localhost:5000/api/seed to seed data
4. Start frontend
5. View table at http://localhost:3000

