import React from "react";

const NavBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 flex items-center w-full h-20 justify-between px-4 sm:px-6 md:px-10 border-b-2 border-gray-200 bg-white z-50">
      <nav>
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent select-none"
          style={{
            fontFamily: 'Orbitron, Space Grotesk, Inter, Arial, sans-serif',
            backgroundImage: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            letterSpacing: '0.04em',
          }}
        >
          PINNs
        </h1>
      </nav>
      <div className="flex items-center">
        <a
          href="https://github.com/senku-200/pinss_explainer_client"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 hover:text-black"
          aria-label="GitHub Repository"
        >
          <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="sm:h-7 sm:w-7 h-6 w-6">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
