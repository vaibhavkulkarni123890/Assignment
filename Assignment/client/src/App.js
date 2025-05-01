import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lecture Video</h1>
      <VideoPlayer 
        userId="user123"
        videoId="lecture1"
        videoUrl="https://www.youtube.com/watch?v=gMt3F7hKjPo"
        videoLength={600} 
      />
    </div>
  );
}

export default App;