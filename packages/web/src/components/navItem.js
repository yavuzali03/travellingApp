import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './NavItem.css';

const NavItem = ({ icon, label, isActive, onPress }) => {
    return (
        <div className={`nav-item ${isActive ? 'active' : ''}`} onClick={onPress}>
            <FontAwesomeIcon icon={icon} className="nav-icon" />
            <span className="nav-label">{label}</span>
            <FontAwesomeIcon icon={faAngleRight} className="nav-arrow" />
        </div>
    );
};

export default NavItem;
