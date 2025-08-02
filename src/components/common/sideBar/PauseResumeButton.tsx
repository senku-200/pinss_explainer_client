import React from "react";

export type PauseResumeButtonProps = {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  disabled?: boolean;
};

const PauseResumeButton: React.FC<PauseResumeButtonProps> = ({
  isPaused,
  onPause,
  onResume,
  disabled = false,
}) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded transition-colors duration-200 ${
        isPaused
          ? "bg-green-500 hover:bg-green-600"
          : "bg-yellow-500 hover:bg-yellow-600"
      }`}
      onClick={isPaused ? onResume : onPause}
      disabled={disabled}
      title={isPaused ? "Resume" : "Pause"}
      style={{ minWidth: 80 }}
    >
      {isPaused ? (
        <span className="flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,3 19,10 5,17" fill="white" />
          </svg>
          Resume
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="3" width="4" height="14" fill="white" />
            <rect x="12" y="3" width="4" height="14" fill="white" />
          </svg>
          Pause
        </span>
      )}
    </button>
  );
};

export default PauseResumeButton;
