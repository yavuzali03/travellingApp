import React from 'react';

const styles = {
  button: {
    backgroundColor: 'transparent',
    color: '#ED1C24',
    border: '2px solid #ED1C24',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  buttonHover: {
    backgroundColor: '#ED1C24',
    color: 'white'
  },
  disabled: {
    borderColor: '#ccc',
    color: '#ccc',
    cursor: 'not-allowed'
  }
};

const ButtonOutlined = ({ onPress, title, style, disabled }) => {
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
          e.currentTarget.style.color = styles.buttonHover.color;
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
          e.currentTarget.style.color = styles.button.color;
        }
      }}
      onClick={onPress}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonOutlined;
