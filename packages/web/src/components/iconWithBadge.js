import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  container: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  icon: {
    fontSize: '1.25rem',
    color: '#495057'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ED1C24',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    minWidth: '18px',
    height: '18px',
    borderRadius: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px'
  }
};

const IconWithBadge = ({ icon, badgeCount, onClick }) => {
  return (
    <div style={styles.container} onClick={onClick}>
      <FontAwesomeIcon icon={icon} style={styles.icon} />
      {badgeCount > 0 && (
        <span style={styles.badge}>{badgeCount}</span>
      )}
    </div>
  );
};

export default IconWithBadge;
