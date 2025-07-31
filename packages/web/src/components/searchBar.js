import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

const styles = {
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '50px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px'
  },
  searchIcon: {
    color: '#666',
    fontSize: '1.1rem'
  },
  inputContainer: {
    position: 'relative',
    flex: 1
  },
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    color: '#333',
    backgroundColor: 'transparent'
  },
  clearButton: {
    position: 'absolute',
    right: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    padding: '0.25rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    transition: 'color 0.2s'
  },
  clearButtonHover: {
    color: '#333'
  },
  clearIcon: {
    fontSize: '1rem'
  }
};

const SearchBar = ({ value, setValue, setOnSearch }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        setOnSearch(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOnSearch(false);
    };

    const handleClear = () => {
        setValue('');
        setOnSearch(false);
        setIsFocused(false);
    };

    return (
        <div style={styles.searchBar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.searchIcon} />
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="Kullanıcı ara..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {value && (
                    <button 
                        style={styles.clearButton}
                        onMouseOver={(e) => e.currentTarget.style.color = styles.clearButtonHover.color}
                        onMouseOut={(e) => e.currentTarget.style.color = styles.clearButton.color}
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faXmark} style={styles.clearIcon} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
