import React from 'react';
import "./css/leftpanel.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faUserLock } from '@fortawesome/free-solid-svg-icons'

export default function leftpanel() {
    return (
        <div className="Leftpanel">
            <div className="Leftpanel-title-section">
                <div className="Leftpanel-title">SA-INTRANET</div>
                <div className="Leftpanel-icon-section">
                    <div className="Leftpanel-icon line1"></div>
                    <div className="Leftpanel-icon line2"></div>
                    <div className="Leftpanel-icon line3"></div>
                </div>
            </div>
            <div className="Leftpanel-menu-section">
                <div className="Leftpanel-menu active">
                <FontAwesomeIcon icon={faBullhorn} /> Announcements
                </div>
                <div className="Leftpanel-menu">
                <FontAwesomeIcon icon={faUserLock} /> Logout</div>
            </div>
        </div>
    )
}
