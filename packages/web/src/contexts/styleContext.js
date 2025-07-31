import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const useStyle = () => {
  return useContext(StyleContext);
};

export const StyleProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    colors: {
      primary: '#007AFF',
      background: theme === 'light' ? '#FFFFFF' : '#000000',
      text: theme === 'light' ? '#000000' : '#FFFFFF',
      border: theme === 'light' ? '#E5E5E5' : '#333333',
      cardBackground: theme === 'light' ? '#FFFFFF' : '#1A1A1A',
      buttonPrimary: '#ED1C24',
      buttonText: '#FFFFFF',
      inputBackground: '#F3F3EB',
      inputText: '#313335'
    },
    styles: {
      text: {
        fontSize: '16px',
        color: '#313335',
      },
      title: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#313335',
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#ED1C24',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: '16px',
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFF8',
        alignItems: 'center',
        minHeight: '100vh',
      },
      input: {
        width: '60%',
        color: 'gray',
        fontFamily: 'Montserrat-Regular',
      },
      inputContainer: {
        margin: '4px',
        backgroundColor: '#F3F3EB',
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: '16px',
        padding: '0 10px',
      }
    }
  };

  return (
    <StyleContext.Provider value={value}>
      {children}
    </StyleContext.Provider>
  );
};
