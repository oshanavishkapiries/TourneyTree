import React from 'react';

interface ZoomControlsProps {
  stageScale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  stageScale,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  className = '',
  style = {},
}) => {
  const zoomPercentage = Math.round(stageScale * 100);

  const defaultStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '8px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    ...style,
  };

  const buttonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const indicatorStyle: React.CSSProperties = {
    minWidth: '50px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div className={className} style={defaultStyle}>
      <button
        style={stageScale >= 5 ? disabledButtonStyle : buttonStyle}
        onClick={onZoomIn}
        disabled={stageScale >= 5}
        aria-label="Zoom in"
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        +
      </button>

      <div
        style={indicatorStyle}
        onClick={onResetZoom}
        role="button"
        tabIndex={0}
        aria-label={`Current zoom: ${zoomPercentage}%. Click to reset.`}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onResetZoom();
          }
        }}
      >
        {zoomPercentage}%
      </div>

      <button
        style={stageScale <= 0.1 ? disabledButtonStyle : buttonStyle}
        onClick={onZoomOut}
        disabled={stageScale <= 0.1}
        aria-label="Zoom out"
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        -
      </button>
    </div>
  );
};