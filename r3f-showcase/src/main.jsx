import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const rootElement = document.getElementById('r3f-root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App scene="social" domTarget={rootElement} />
    </React.StrictMode>,
  )
}

const graphicRootElement = document.getElementById('r3f-graphic-root')
if (graphicRootElement) {
  ReactDOM.createRoot(graphicRootElement).render(
    <React.StrictMode>
      <App scene="graphic" domTarget={graphicRootElement} />
    </React.StrictMode>,
  )
}

const videoRootElement = document.getElementById('r3f-video-root')
if (videoRootElement) {
  ReactDOM.createRoot(videoRootElement).render(
    <React.StrictMode>
      <App scene="video" domTarget={videoRootElement} />
    </React.StrictMode>,
  )
}
