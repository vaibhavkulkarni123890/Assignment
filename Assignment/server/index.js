require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user1:12vaibhav34890@mycluster.9py9n05.mongodb.net/video-progress')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  watchedIntervals: { type: [[Number]], default: [] },
  lastPosition: { type: Number, default: 0 }
});
const Progress = mongoose.model('Progress', progressSchema);

function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}

function calculateProgress(intervals, videoLength) {
  if (!videoLength || videoLength <= 0) return 0;
  const totalWatched = intervals.reduce((sum, [start, end]) => sum + (end - start), 0);
  return (totalWatched / videoLength) * 100;
}

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.get('/api/progress/:userId/:videoId', async (req, res) => {
    console.log('GET request received for:', req.params.userId, req.params.videoId);
    try {
      const { userId, videoId } = req.params;
      const videoLength = parseFloat(req.query.length) || 0;
      const progress = await Progress.findOne({ userId, videoId });
  
      if (!progress) {
        return res.json({
          watchedIntervals: [],
          lastPosition: 0,
          progressPercentage: 0
        });
      }
  
      res.json({
        ...progress.toObject(),
        progressPercentage: calculateProgress(progress.watchedIntervals, videoLength)
      });
    } catch (err) {
      console.error('Error in GET /api/progress:', err);
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/api/progress', async (req, res) => {
    console.log('POST request received with body:', req.body);
    try {
      const { userId, videoId, interval, lastPosition, videoLength } = req.body;
      let progress = await Progress.findOne({ userId, videoId });
      
      if (!progress) {
        progress = new Progress({ userId, videoId });
      }
  
      if (interval) {
        progress.watchedIntervals = mergeIntervals([...progress.watchedIntervals, interval]);
      }
  
      if (lastPosition !== undefined) {
        progress.lastPosition = lastPosition;
      }
  
      await progress.save();
      res.json({
        ...progress.toObject(),
        progressPercentage: calculateProgress(progress.watchedIntervals, videoLength || 0)
      });
    } catch (err) {
      console.error('Error in POST /api/progress:', err);
      res.status(500).json({ error: err.message });
    }
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));