import React from 'react';
import { Settings, Globe, Check, Download, AlertCircle, Play, Camera, Mic } from 'lucide-react';

// Placeholder for electron IPC
const electron = window.require ? window.require('electron') : null;
const ipcRenderer = electron?.ipcRenderer;

function App() {
  const [isChecking, setIsChecking] = React.useState(false);
  const [checkStatus, setCheckStatus] = React.useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [showSourceSelect, setShowSourceSelect] = React.useState(false);
  const [sources, setSources] = React.useState([]);
  const [selectedSource, setSelectedSource] = React.useState(null);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const handleCheckDependencies = () => {
    setIsChecking(true);
    setCheckStatus('checking');
    
    // Simulate dependency check
    setTimeout(() => {
      setIsChecking(false);
      setCheckStatus('success');
    }, 2000);
  };

  const handleStartStream = async () => {
    if (!ipcRenderer) {
      console.error('Electron IPC not available');
      return;
    }

    try {
      const sources = await ipcRenderer.invoke('get-sources');
      setSources(sources);
      setShowSourceSelect(true);
    } catch (error) {
      console.error('Failed to get sources:', error);
    }
  };

  const handleSourceSelect = async (sourceId: string) => {
    if (!ipcRenderer) return;

    try {
      await ipcRenderer.invoke('start-stream', sourceId);
      setIsStreaming(true);
      setShowSourceSelect(false);
    } catch (error) {
      console.error('Failed to start stream:', error);
    }
  };

  // Placeholder functions for stream controls
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Shadow AI</h1>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Discreet Interview Assistant</h2>
            <p className="text-gray-400 text-lg">
              Enhance your technical interviews with real-time audio processing and intelligent visual analysis
            </p>
          </div>

          {/* Setup Card */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4">System Setup</h3>
            <div className="space-y-4">
              <button
                onClick={handleCheckDependencies}
                disabled={isChecking}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                  checkStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : checkStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {checkStatus === 'checking' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : checkStatus === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : checkStatus === 'error' ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {checkStatus === 'checking'
                  ? 'Checking Dependencies...'
                  : checkStatus === 'success'
                  ? 'All Dependencies Installed'
                  : checkStatus === 'error'
                  ? 'Installation Failed'
                  : 'Check & Install Dependencies'}
              </button>

              {checkStatus === 'success' && (
                <button
                  onClick={handleStartStream}
                  className="w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Start Streaming
                </button>
              )}
            </div>
          </div>

          {/* Source Selection Modal */}
          {showSourceSelect && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Select Window to Stream</h3>
                <div className="space-y-2">
                  {/* Placeholder for source list */}
                  <button
                    onClick={() => handleSourceSelect('placeholder-id')}
                    className="w-full p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                  >
                    Placeholder Window
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Stream Module',
                description: 'Capture live video and audio from specific application windows with precision.',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
              },
              {
                title: 'Audio Module',
                description: 'Real-time audio transcription using Apple\'s native speech recognition.',
                image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
              },
              {
                title: 'Capture Module',
                description: 'On-demand screenshot analysis with advanced AI processing.',
                image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
              },
              {
                title: 'Intelligent Processing',
                description: 'Context-aware routing between specialized AI models for optimal results.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-colors"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;