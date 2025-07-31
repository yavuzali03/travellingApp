import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#333',
    cursor: 'pointer',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s'
  },
  backButtonHover: {
    color: '#007bff'
  },
  title: {
    fontSize: '1.25rem',
    color: '#333',
    margin: 0,
    fontWeight: 500
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }
};

const TopBar = ({ title, showBackButton = true, rightComponent }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.topBar}>
      <div style={styles.left}>
        {showBackButton && (
          <button 
            style={styles.backButton}
            onMouseOver={(e) => e.currentTarget.style.color = styles.backButtonHover.color}
            onMouseOut={(e) => e.currentTarget.style.color = styles.backButton.color}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
        )}
        <h1 style={styles.title}>{title}</h1>
      </div>
      {rightComponent && (
        <div style={styles.right}>
          {rightComponent}
        </div>
      )}
    </div>
  );
};

export default TopBar;
