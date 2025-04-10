import React from 'react';
import { Camera, Mic, X } from 'lucide-react';

const electron = window.require ? window.require('electron') : null;
const ipcRenderer = electron?.ipcRenderer;

function StreamWindow() {
  const handleScreenshot = async () => {
    if (!ipcRenderer) return;
    try {
      await ipcRenderer.invoke('capture-screenshot');
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  };

  const handleAudioCapture = async () => {
    if (!ipcRenderer) return;
    try {
      await ipcRenderer.invoke('start-audio-capture');
    } catch (error) {
      console.error('Failed to start audio capture:', error);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Shadow AI Assistant</h3>
        <button className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleScreenshot}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Camera className="w-4 h-4" />
            Capture
          </button>
          <button
            onClick={handleAudioCapture}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Mic className="w-4 h-4" />
            Audio
          </button>
        </div>

        {/* Placeholder for transcription output */}
        <div className="bg-gray-800 rounded-lg p-4 h-48 overflow-y-auto">
          <p className="text-gray-400">Transcription output will appear here...</p>
        </div>

        {/* Placeholder for AI analysis */}
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400">AI analysis will appear here...</p>
        </div>
      </div>
    </div>
  );
}

export default StreamWindow;