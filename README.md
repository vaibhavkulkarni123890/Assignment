# Video Progress Tracker 🎥⏱️  
*A MERN stack app that remembers your video progress*

![Demo GIF](https://github.com/vaibhavkulkarni123890/video-progress-tracker/blob/main/screenshots/demo.gif?raw=true)

## 🌟 Features  
- **Resume playback** from last watched position  
- **Progress tracking** with visual percentage  
- **Watched intervals** saved per user  
- **Responsive** video player (supports YouTube/MP4)  

---

## 🖥️ Screenshots  

| ![Home Screen](https://github.com/vaibhavkulkarni123890/video-progress-tracker/blob/main/screenshots/home.png?raw=true) | ![Progress Tracking](https://github.com/vaibhavkulkarni123890/video-progress-tracker/blob/main/screenshots/progress.png?raw=true) |
|-------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| *Clean video interface*                                                                                                  | *Real-time progress tracking*                                                                                                   |

---

## 🛠️ Tech Stack  
**Frontend**: React, React Player, Axios  
**Backend**: Node.js, Express  
**Database**: MongoDB Atlas  

---

👉 **Live Demo**: [Frontend on Firebase](https://video-progress-tracker-e82ac.web.app)  

## 🚀 Quick Start (Local Setup)

### 1. Clone & Install
```bash
git clone https://github.com/vaibhavkulkarni123890/video-progress-tracker.git
cd video-progress-tracker/Assignment
2. Frontend Setup
bash
cd client
npm install
npm start  # Runs on http://localhost:3000
3. Backend Setup (Not hosted yet)
bash
cd ../server
npm install
Create .env file:

env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/video-progress?retryWrites=true&w=majority
PORT=5000
Start backend:

bash
npm run dev  # Runs on http://localhost:5000
