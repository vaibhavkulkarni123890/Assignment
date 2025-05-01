import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
const VideoPlayer = ({ userId, videoId, videoUrl, videoLength }) => {
  const [progress, setProgress] = useState({ 
    watchedIntervals: [], 
    lastPosition: 0, 
    progressPercentage: 0 
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const playerRef = useRef(null);
  const currentIntervalRef = useRef(null);

  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
      ? 'mongodb+srv://user1:12vaibhav34890@mycluster.9py9n05.mongodb.net/video-progess-tracker' 
      : 'http://localhost:5000'
  });

  const saveInterval = useCallback(async (interval) => {
    try {
      const response = await api.post('/api/progress', {
        userId,
        videoId,
        interval,
        lastPosition: playerRef.current?.getCurrentTime() || 0,
        videoLength
      });
      setProgress(response.data);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  }, [userId, videoId, videoLength, api]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await api.get(`/api/progress/${userId}/${videoId}`, {
          params: { length: videoLength }
        });
        setProgress(response.data);
        if (response.data.lastPosition > 0) {
          playerRef.current?.seekTo(response.data.lastPosition, 'seconds');
        }
      } catch (err) {
        console.error('Error loading progress:', err);
      }
    };
    loadProgress();
  }, [userId, videoId, videoLength, api]);

  const handlePlay = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    currentIntervalRef.current = [currentTime, currentTime];
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (currentIntervalRef.current) {
      currentIntervalRef.current[1] = playerRef.current?.getCurrentTime() || 0;
      saveInterval(currentIntervalRef.current);
      currentIntervalRef.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="video-player">
      {error && <div className="error">{error}</div>}
      
      <div className="progress-display">
        Watched: {progress.progressPercentage.toFixed(1)}%
        <div className="progress-bar">
          <div 
            className="progress-indicator" 
            style={{ width: `${progress.progressPercentage}%` }}
          />
        </div>
      </div>

      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        controls
        width="100%"
        height="400px"
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={({ playedSeconds }) => {
          if (isPlaying && currentIntervalRef.current) {
            currentIntervalRef.current[1] = playedSeconds;
          }
        }}
        config={{
            youtube: {
              playerVars: {
                origin: window.location.origin,
                widgetid: "1",
                enablejsapi: 1,
                rel: 0
              }
            }
          }}
      />
    </div>
  );
};

export default VideoPlayer;