import React from 'react';
import './App.css';
import RegGuideFAQ from './RegGuideFAQ';

// PUBLIC_INTERFACE
function App() {
  // This root App renders the main RegGuideFAQ container inside the shared app/chrome layout.
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" disabled style={{ background: "var(--primary)", opacity: 0.65 }}>
              RegGuide
            </button>
          </div>
        </div>
      </nav>
      {/* Render the RegGuide Interactive FAQ container */}
      <main>
        <div className="container">
          <RegGuideFAQ />
        </div>
      </main>
    </div>
  );
}

export default App;