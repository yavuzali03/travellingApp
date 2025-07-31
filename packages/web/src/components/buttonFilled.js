import React from 'react';

const styles = {
  button: {
    backgroundColor: '#ED1C24',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  buttonHover: {
    backgroundColor: '#c41820'
  },
  disabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  }
};

const ButtonFilled = ({ onPress, title, style, disabled }) => {
  return (
    <button 
      style={{
        ...styles.button,
        ...(disabled ? styles.disabled : {}),
        ...style
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
        }
      }}
      onClick={onPress}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonFilled;
