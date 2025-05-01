# Video Progress Tracker 🎥⏱️  
*A MERN stack app that remembers where you left off in videos*

![Frontend Interface](https://github.com/vaibhavkulkarni123890/video-progress-tracker/blob/main/screenshots/frontend.png?raw=true)  
*Screenshot: Clean photo interface with progress tracking*

---

## 🌟 Key Features  
- **Smart Resume**: Automatically continues from last watched position  
- **Visual Progress**: Percentage bar and watched intervals  
- **Cross-Platform**: Works on desktop and mobile  
- **Database Backed**: Saves all progress to MongoDB  

![Database Structure](https://github.com/vaibhavkulkarni123890/video-progress-tracker/blob/main/screenshots/database.png?raw=true)  
*Screenshot: MongoDB Atlas storing user progress data*

---

## 🛠️ Tech Stack  
| Component       | Technology |
|-----------------|------------|
| **Frontend**    | React, React Player, Axios |
| **Backend**     | Node.js, Express |
| **Database**    | MongoDB Atlas |
| **Hosting**     | Firebase (Frontend) |

---

## 🚀 Try It Out  
🔗 [Live Frontend Demo](https://video-progress-tracker-e82ac.web.app)  

**Local Setup**:  
```bash
# 1. Clone repo
git clone https://github.com/vaibhavkulkarni123890/video-progress-tracker.git

# 2. Start frontend
cd video-progress-tracker/Assignment/client
npm install && npm start

# 3. Start backend (requires MongoDB URI)
cd ../server
npm install && npm run dev
